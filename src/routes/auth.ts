import { Router } from "express";
import {
  loginUser,
  logoutUser,
  passportAuthGoogle,
  passportAuthLocal,
  registerUser,
} from "../controllers";
import passport from "passport";

export const authRoute = Router();

authRoute.post("/login", passportAuthLocal, loginUser);
authRoute.post("/register", registerUser);
authRoute.get("/logout", logoutUser);
authRoute.get("/google", passportAuthGoogle, loginUser);
authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("https://main--resonant-hamster-501521.netlify.app/");
  }
);
