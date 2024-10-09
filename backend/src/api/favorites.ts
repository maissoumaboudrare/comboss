import { Hono } from "hono";
import * as model from "../models";

import { z } from 'zod';

import authMiddleware from '../middleware/auth';

const favoriteSchema = z.object({
  comboID: z.number().min(1, "Combo ID must be a positive integer."),
});

const favorites = new Hono();

favorites.post("/:comboID", authMiddleware, async (c) => {
  const comboID = parseInt(c.req.param("comboID"), 10);
  const userID = c.get("userID") as number;
  const parsedFavorite = favoriteSchema.safeParse({ comboID });
  if (!parsedFavorite.success) {
    return c.json({ message: "Invalid favorite data format", errors: parsedFavorite.error.errors }, 400);
  }

  const newFavorite = await model.addFavorite(userID, parsedFavorite.data.comboID);

  return c.json(newFavorite, 201);
});

favorites.delete("/:comboID", authMiddleware, async (c) => {
  const comboID = parseInt(c.req.param("comboID"), 10);
  const userID = c.get("userID") as number;

  const parsedFavorite = favoriteSchema.safeParse({ comboID });
  if (!parsedFavorite.success) {
    return c.json({ message: "Invalid favorite data format", errors: parsedFavorite.error.errors }, 400);
  }

  await model.deleteFavorite(userID, parsedFavorite.data.comboID);
  return c.json({ message: "Favorite deleted successfully" }, 200);
});

favorites.get("/user/:userID", async (c) => {
  const userID = parseInt(c.req.param("userID"), 10);
  const favorites = await model.getFavoritesByUser(userID);

  return c.json(favorites, 200);
});

export default favorites;