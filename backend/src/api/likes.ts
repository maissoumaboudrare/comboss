import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import * as model from "../models";

import { z } from 'zod';

import authMiddleware from '../middleware/auth';

const likeSchema = z.object({
  comboID: z.number().min(1, "Combo ID must be a positive integer."),
});

const likes = new Hono();

likes.post("/:comboID", authMiddleware, async (c) => {
  const comboID = parseInt(c.req.param("comboID"), 10);
  const userID = c.get("userID") as number;
  const parsedLike = likeSchema.safeParse({ comboID });
  if (!parsedLike.success) {
    return c.json({ message: "Invalid like data format", errors: parsedLike.error.errors }, 400);
  }

  const newLike = await model.addLike(userID, parsedLike.data.comboID);

  return c.json(newLike, 201);
});

likes.delete("/:comboID", authMiddleware, async (c) => {
  const comboID = parseInt(c.req.param("comboID"), 10);
  const userID = c.get("userID") as number;

  const parsedLike = likeSchema.safeParse({ comboID });
  if (!parsedLike.success) {
    return c.json({ message: "Invalid like data format", errors: parsedLike.error.errors }, 400);
  }

  await model.deleteLike(userID, parsedLike.data.comboID);
  return c.json({ message: "Like deleted successfully" }, 200);
});

likes.get("/combo/:comboID", authMiddleware, async (c) => {
  const comboID = parseInt(c.req.param("comboID"), 10);
  const likeCount = await model.getLikesByCombo(comboID);

  return c.json({ likeCount }, 200);
});

export default likes;