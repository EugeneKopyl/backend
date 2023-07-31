import { ObjectId } from "mongoose";

export interface IMessage {
  _id: ObjectId;
  title: string;
  description: string;
}
