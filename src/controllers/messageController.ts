import { Response, Request } from "express";
import { MessageModel } from "../models";
import * as mongoose from "mongoose";

export const getMessages = async (req: Request, res: Response) => {
  const messages = await MessageModel.find({}).sort({ createAt: -1 });

  res.json(messages);
};

export const getMessageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json({ error: "No such messages" });
  }

  try {
    const message = await MessageModel.findOne({ _id: id });
    if (!message) {
      return res.status(404).json({ error: "No such message" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
};

export const updateMessageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  try {
    const message = await MessageModel.findOneAndUpdate(
      { _id: id },
      { ...req?.body },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ error: "No such message" });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
};

export const deleteMessageById = async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "No such message" });
  }

  try {
    const message = await MessageModel.findOneAndDelete({ _id: req.params.id });
    if (!message) {
      return res.status(404).json({ error: "No such message" });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
};

export const createMessage = async (req: Request, res: Response) => {
  const { title, description } = req?.body || null;
  try {
    const message = await MessageModel.create({ title, description });
    res.json(message);
  } catch (error) {
    res.json(error);
  }
  return;
};
