import { Response, Request } from "express";
import { UserModel } from "../models";
import bcrypt from "bcryptjs";
import passport from "passport";

export const passportAuthLocal = passport.authenticate("local", {
  failureMessage: true,
});

export const passportAuthGoogle = passport.authenticate("google", {
  failureMessage: true,
});

export const registerUser = async (req: Request, res: Response) => {
  await UserModel.findOne({ username: req?.body.username })
    .then(async (data) => {
      if (!data) {
        const hashedPassword = await bcrypt.hash(req?.body.password, 10);

        await UserModel.create({
          username: req?.body.username,
          email: req?.body.username,
          password: hashedPassword,
        });
        res.send("user created");
      }

      if (data) {
        res.send("user exist");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

export const loginUser = (req: Request, res: Response) => {
  req.session.regenerate(function (err) {
    if (err) throw new Error(err);

    req.session.user = req.user;

    req.session.save(function (err) {
      if (err) throw new Error(err);
      res.send("Logged user:" + req.user);
    });
  });
};

export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy(function (err) {
    if (err) {
      return err;
    }
    res.send("logged out!");
  });
};
