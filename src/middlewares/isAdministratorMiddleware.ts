import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models";

export const isAdministratorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user }: any = req.session;
  if (user) {
    await UserModel.findOne({ username: user.username })
      .then((user: any) => {
        if (user.isAdmin) {
          next();
        } else {
          res.send("You are not admin");
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send("You are not logged in.");
  }
};
