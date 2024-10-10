import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import * as model from "../models";
import * as argon2 from "argon2";
import * as crypto from "crypto";

import authMiddleware from "../middleware/auth";

import { z } from "zod";
import rolesMiddleware from "../middleware/role";

const emailValidation = new RegExp(
  /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
);

const userSchema = z.object({
  email: z
    .string()
    .regex(emailValidation, {
      message: "Invalid email format.",
    }),
  password: z
    .string()
    .min(8, "Password requires at least 8 characters !")
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, { message: "Password must contain at least one special character." }),
    pseudo: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(8, {
      message: "Username can't exceed 8 characters.",
    })
    .regex(/^[a-z0-9]+$/, {
      message: "Username can only contain lowercase letters and numbers.",
    }),
});

const users = new Hono();

users.get("/", authMiddleware, rolesMiddleware(['admin']), async (c) => {
  try {
    const users = await model.getUsers();
    return c.json(users, 200);
  } catch (err) {
    console.error("Error fetching users:", err);
    return c.json({ message: "Error fetching users" }, 500);
  }
});

users.get("/:userID", authMiddleware, rolesMiddleware(['admin']), async (c) => {
  try {
    const userID = parseInt(c.req.param("userID"), 10);
    const user = await model.getUser(userID);
    if (user) {
      return c.json(user, 200);
    } else {
      return c.json({ message: "User not found" }, 404);
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    return c.json({ message: "Error fetching user" }, 500);
  }
});

users.post("/", async (c) => {
  const inputFields = await c.req.json();
  // const { success, data: newUser, error } = userSchema.safeParse(inputFields);
  // if (!success) {
  //   return c.json({ message: "Invalid user data format" }, 400);
  // }
  const newUser = userSchema.safeParse(inputFields);

  if (!newUser.success) {
    return c.json(
      { message: "Invalid user data format", errors: newUser.error.errors },
      400
    );
  }

  const addedUser = await model.createUser(newUser.data);

  return c.json(addedUser, 201);
});

users.post("/login", async (c) => {
  const inputFields = await c.req.json();
  const credentials = userSchema.safeParse(inputFields);

  if (!credentials.success) {
    return c.json(
      { message: "Invalid credentials format", errors: credentials.error.errors },
      400
    );
  }

  try {
    const user = await model.authUser(credentials.data);

    if (user) {
      const isCorrectPassword = await argon2.verify(
        user.password,
        credentials.data.password
      );

      if (isCorrectPassword) {
        const token: string = crypto.randomUUID();
        const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

        await model.createSession({
          userID: user.userID,
          token,
          expirationTime,
        });

        setCookie(c, "session_token", token, {
          httpOnly: true,
          expires: expirationTime,
        });

        return c.json({ message: "Login successful" });
      }
    }

    return c.json({ message: "Invalid credentials" }, 401);
  } catch (err) {
    console.error("Error during login:", err);
    return c.json({ message: "Login failed" }, 500);
  }
});

users.post("/logout", async (c) => {
  try {
    const token = getCookie(c, "session_token");

    if (token) {
      await model.deleteSession(token);
      deleteCookie(c, "session_token");
      return c.json({ message: "Logout successful" });
    }

    return c.json({ message: "Cookie not found !" });
  } catch (err) {
    console.error("Error during logout:", err);
    return c.json({ message: "Logout failed" }, 500);
  }
});

users.patch("/:userID/password", authMiddleware, rolesMiddleware(['admin', 'visitor']), async (c) => {
  const userIDFromParam = parseInt(c.req.param("userID"), 10);

  const userIDFromSession = c.get("userID");

  const { oldPassword, newPassword } = await c.req.json();

  if (isNaN(userIDFromParam)) {
    return c.json({ message: "Invalid user ID" }, 400);
  }

  if (userIDFromSession !== userIDFromParam) {
    return c.json({ message: "Unauthorized access" }, 403);
  }

  try {
    const user = await model.getUserPassword(userIDFromParam);
    if (!user) return c.json({ message: "User not found" }, 404);

    const passwordMatch = await argon2.verify(user.password, oldPassword);
    if (!passwordMatch) {
      return c.json({ message: "Old password is incorrect" }, 400);
    }

    const hashedPassword = await argon2.hash(newPassword);

    await model.updateUserPassword(userIDFromParam, hashedPassword);

    return c.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    return c.json({ message: "Failed to update password" }, 500);
  }
});

users.patch("/:userID/avatar", authMiddleware, rolesMiddleware(['admin', 'visitor']), async (c) => {
  const userID = parseInt(c.req.param("userID"), 10);
  const { avatarUrl } = await c.req.json();

  if (isNaN(userID)) {
    return c.json({ message: "Invalid user ID" }, 400);
  }

  try {
    await model.updateUserAvatar(userID, avatarUrl);
    return c.json({ message: "Avatar updated successfully" });
  } catch (err) {
    console.error("Error updating avatar:", err);
    return c.json({ message: "Failed to update avatar" }, 500);
  }
});

users.delete("/:userID", authMiddleware, rolesMiddleware(['admin', 'visitor']), async (c) => {
  const userID = parseInt(c.req.param("userID"), 10);

  if (isNaN(userID)) {
    return c.json({ message: "Invalid user ID" }, 400);
  }

  try {
    await model.deleteUserByUserID(userID);
    return c.json({ message: "User deleted successfully" }, 200);
  } catch (err) {
    console.error("Error deleting user:", err);
    return c.json({ message: "Failed to delete user" }, 500);
  }
});

export default users;
