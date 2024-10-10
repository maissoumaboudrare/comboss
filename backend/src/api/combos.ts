import { Hono } from "hono";
import * as model from "../models";
import { getCookie } from "hono/cookie";
import { z } from "zod";

import authMiddleware from "../middleware/auth";
import rolesMiddleware from "../middleware/role";

const inputSchema = z.object({
  inputName: z.string().min(1, "Input name is required."),
  inputSrc: z.string().url("Invalid URL for input source."),
});

const positionSchema = z.object({
  positionName: z.string().min(1, "Position name is required."),
});

const comboSchema = z.object({
  characterID: z.number().min(1, "Character ID must be a positive integer."),
  comboName: z.string().min(1, "Combo name is required."),
});

const comboDataSchema = z.object({
  combo: comboSchema,
  positions: z.array(positionSchema),
  inputs: z.array(z.array(inputSchema)),
});

const combos = new Hono();

combos.get("/", async (c) => {
  try {
    const allCombos = await model.getCombos();
    return c.json(allCombos, 200);
  } catch (err) {
    console.error("Error fetching combos:", err);
    return c.json({ message: "Error fetching combos" }, 500);
  }
});

combos.get("/character/:characterID", async (c) => {
  try {
    const characterID = parseInt(c.req.param("characterID"), 10);
    const token = getCookie(c, "session_token");
    let userID: number | undefined;

    if (token) {
      const session = await model.getSessionByToken(token);
      if (session && session.userID !== null) {
        userID = session.userID;
      }
    }

    const characterCombos = await model.getCombosByCharacter(
      characterID,
      userID
    );
    return c.json(characterCombos, 200);
  } catch (err) {
    console.error("Error fetching character combos:", err);
    return c.json({ message: "Error fetching character combos" }, 500);
  }
});

combos.get("/user/:userID", async (c) => {
  try {
    const userID = parseInt(c.req.param("userID"), 10);
    const userCombos = await model.getCombosByUser(userID);
    return c.json(userCombos, 200);
  } catch (err) {
    console.error("Error fetching user combos:", err);
    return c.json({ message: "Error fetching user combos" }, 500);
  }
});

combos.post("/", authMiddleware, rolesMiddleware(['admin', 'visitor']), async (c) => {
  try {
    const inputData = await c.req.json();
    const parsedData = comboDataSchema.safeParse(inputData);
    if (!parsedData.success) {
      return c.json(
        {
          message: "Invalid combo data format",
          errors: parsedData.error.errors,
        },
        400
      );
    }
    const userID = c.get("userID");
    const addedCombo = await model.addCombo(
      { ...parsedData.data.combo, userID },
      parsedData.data.positions,
      parsedData.data.inputs
    );
    return c.json(addedCombo, 201);
  } catch (err) {
    console.error("Error adding combo:", err);
    return c.json({ message: "Error adding combo" }, 500);
  }
});

combos.delete("/:comboID", authMiddleware, rolesMiddleware(['admin', 'visitor']), async (c) => {
  try {
    const comboID = parseInt(c.req.param("comboID"), 10);
    const userID = c.get("userID") as number;
    await model.deleteCombo(comboID, userID);
    return c.json({ message: "Combo deleted" }, 200);
  } catch (err) {
    console.error("Error deleting combo:", err);
    return c.json({ message: "Error deleting combo" }, 500);
  }
});

export default combos;
