import { Hono } from "hono";
import * as model from "../models";
import { z } from 'zod';

import authMiddleware from "../middleware/auth";
import rolesMiddleware from "../middleware/role";

const inputSchema = z.object({
  inputName: z.string().min(1, "Input name is required."),
  inputSrc: z.string().url("Invalid URL for input source."),
});

const inputs = new Hono();

inputs.get("/", async (c) => {
  try {
    const allInputs = await model.getInputs();
    return c.json(allInputs, 200);
  } catch (err) {
    console.error("Error fetching inputs:", err);
    return c.json({ message: "Error fetching inputs" }, 500);
  }
});

inputs.post("/", authMiddleware, rolesMiddleware(['admin']), async (c) => {

  try {
    const newInput = await c.req.json();
    const parsedInput = inputSchema.safeParse(newInput);

    if (!parsedInput.success) {
      return c.json(
        { message: "Invalid input data format", errors: parsedInput.error.errors },
        400
      );
    }

    const addedInput = await model.addInput(parsedInput.data);
    return c.json(addedInput, 201);
  } catch (err) {
    console.error("Error adding input:", err);
    return c.json({ message: "Error adding input" }, 500);
  }
});

inputs.delete("/:inputID", authMiddleware, rolesMiddleware(['admin']), async (c) => {
  try {
    const inputID = parseInt(c.req.param("inputID"), 10);
    await model.deleteInput(inputID);
    return c.json({ message: "Input deleted" }, 200);
  } catch (err) {
    console.error("Error deleting input:", err);
    return c.json({ message: "Error deleting input" }, 500);
  }
});

inputs.patch("/:inputID", authMiddleware, rolesMiddleware(['admin']), async (c) => {
  try {
    const inputID = parseInt(c.req.param("inputID"), 10);
    const updatedData = await c.req.json();
    const parsedInput = inputSchema.safeParse(updatedData);

    if (!parsedInput.success) {
      return c.json(
        { message: "Invalid input data format", errors: parsedInput.error.errors },
        400
      );
    }

    const updatedInput = await model.updateInput(inputID, parsedInput.data);
    return c.json(updatedInput, 200);
  } catch (err) {
    console.error("Error updating input:", err);
    return c.json({ message: "Error updating input" }, 500);
  }
});

export default inputs;