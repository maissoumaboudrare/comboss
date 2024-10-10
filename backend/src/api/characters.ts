import { Hono } from "hono";
import * as model from "../models";
import { z } from 'zod';

import authMiddleware from '../middleware/auth';
import rolesMiddleware from "../middleware/role";

const characterSchema = z.object({
  name: z.string().min(1, "Name is required."),
  vitality: z.number().min(0, "Vitality must be a positive number."),
  height: z.number().min(0, "Height must be a positive number."),
  weight: z.number().min(0, "Weight must be a positive number."),
  story: z.string().min(1, "Story is required."),
  type: z.string().min(1, "Type is required."),
  effectiveRange: z.string().min(1, "Effective range is required."),
  easeOfUse: z.string().min(1, "Ease of use is required."),
  avatar: z.string().url("Invalid URL for avatar."),
  thumbnail: z.string().url("Invalid URL for thumbnail."),
  numberOfCombos: z.number().nonnegative("Number of combos must be zero or greater."),
  numberOfLikes: z.number().nonnegative("Number of likes must be zero or greater."),
  numberOfLovers: z.number().nonnegative("Number of lovers must be zero or greater."),
});

const characters = new Hono();

characters.get("/", async (c) => {
  try {
    const allCharacters = await model.getCharacters();
    return c.json(allCharacters, 200);
  } catch (err) {
    console.error("Error fetching characters:", err);
    return c.json({ message: "Error fetching characters" }, 500);
  }
});

characters.get("/:characterID", async (c) => {
  try {
    const characterID = parseInt(c.req.param("characterID"), 10);
    const character = await model.getCharacterById(characterID);
    if (!character) {
      return c.json({ message: "Character not found" }, 404);
    }
    return c.json(character, 200);
  } catch (err) {
    console.error("Error fetching character:", err);
    return c.json({ message: "Error fetching character" }, 500);
  }
});

characters.post("/", authMiddleware, rolesMiddleware(['admin']), async (c) => {
  try {
    const newCharacter = await c.req.json();
    const parsedCharacter = characterSchema.safeParse(newCharacter);

    if (!parsedCharacter.success) {
      return c.json({ message: "Invalid character data format", errors: parsedCharacter.error.errors }, 400);
    }
    const addedCharacter = await model.addCharacter(parsedCharacter.data);
    return c.json(addedCharacter, 201);
  } catch (err) {
    console.error("Error adding character:", err);
    return c.json({ message: "Error adding character" }, 500);
  }
});

characters.delete("/:characterID", authMiddleware, rolesMiddleware(['admin']), async (c) => {
  try {
    const characterID = parseInt(c.req.param("characterID"), 10);
    await model.deleteCharacter(characterID);
    return c.json({ message: "Character deleted" }, 200);
  } catch (err) {
    console.error("Error deleting character:", err);
    return c.json({ message: "Error deleting character" }, 500);
  }
});

characters.patch("/:characterID", authMiddleware, rolesMiddleware(['admin']), async (c) => {
  try {
    const characterID = parseInt(c.req.param("characterID"), 10);
    const updatedData = await c.req.json();
    const updatedCharacter = await model.updateCharacter(characterID, updatedData);
    return c.json(updatedCharacter, 200);
  } catch (err) {
    console.error("Error updating character:", err);
    return c.json({ message: "Error updating character" }, 500);
  }
});

export default characters;