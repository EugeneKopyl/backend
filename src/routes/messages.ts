import { Router } from "express";
import {
  createMessage,
  deleteMessageById,
  getMessageById,
  getMessages,
  updateMessageById,
} from "../controllers";

export const messagesRoute = Router();

messagesRoute.get("/", getMessages);

messagesRoute.get("/:id", getMessageById);

messagesRoute.post("/", createMessage);

messagesRoute.delete("/:id", deleteMessageById);

messagesRoute.patch("/:id", updateMessageById);
