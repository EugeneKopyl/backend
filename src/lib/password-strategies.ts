import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models";
import bcrypt from "bcryptjs";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const localStrategy = new LocalStrategy(function verify(
  username: string,
  password: string,
  cb
) {
  UserModel.findOne({ username: username })
    .then(async (user: any) => {
      if (!user) {
        return cb(null, false);
      }
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err;
        if (result) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      });
    })
    .catch((err) => console.log("----err----", err));
});

export const googleStrategy = new GoogleStrategy(
  {
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  function (accessToken: any, refreshToken: any, profile: any, cb: any) {
    const userInfo = profile._json;
    console.log(profile._json);
    return cb(null, userInfo);
  }
);
