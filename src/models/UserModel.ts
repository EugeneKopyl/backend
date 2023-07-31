import { Schema, model } from "mongoose";
import {IDBUser} from '../interfaces';

const userSchema = new Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },

    username: {
      type: String,
      require: true,
      unique: true,
      maxlength: 25,
    },

    firstName: {
      type: String,
      // default: "Не заполнено",
    },

    LastName: {
      type: String,
      // default: "Не заполнено",
    },

    email: {
      type: String,
      // require: true,
      // unique: true,
      trim: true,
      // minlength: 5,
    },

    password: {
      type: String,
      require: true,
      // minlength: 6,
    },

    picture: {
      type: String,
      default: "user-picture.png",
    },

    description: {
      type: String,
      // default: "Не заполнено",
    },

    about: {
      type: String,
      // default: "Не заполнено",
    },

    type: {
      type: String,
      default: "user",
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },

    user_registered: {
      type: Date,
      default: Date.now(),
    },

    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const UserModel = model<IDBUser>("User", userSchema);
