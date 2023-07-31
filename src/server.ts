import express, { Express, Request, Response } from "express";
import { authRoute, messagesRoute, usersRoute } from "./routes";
import dotenv from "dotenv";
import log4js from "log4js";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import createMemoryStore = require("memorystore");
import { googleStrategy, localStrategy } from "./lib/password-strategies";
import * as os from "os";

declare module "express-session" {
  interface SessionData {
    user: any;
  }
}

const hostName = os.hostname();
dotenv.config();
const port = Number(process.env.PORT) || 3000;
const memoryStore = createMemoryStore(session);

mongoose
  .connect(`${process.env.MONGO_DB_URL}`)
  .then(() => {
    console.log("...MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.enable("trust proxy");
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60,
      sameSite: "none",
    },
    store: new memoryStore({
      checkPeriod: 1000 * 60 * 60 * 24, // prune expired entries every 24h
    }),
    resave: false,
    secret: "secret keyboard cat",
    saveUninitialized: true,
    proxy: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req: Request, res: Response, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/messages", messagesRoute);
app.use("/api/users", usersRoute);
app.use("/auth", authRoute);

// logger
const logger = log4js.getLogger();
logger.level = `${process.env.LOG_LEVEL}`;
logger.info("log info");
logger.debug("log debug");
logger.error("log error");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(localStrategy);
passport.use(<passport.Strategy>googleStrategy);

passport.serializeUser((user: any, cb: any) => {
  console.log("serializeUser");
  cb(null, user);
});

passport.deserializeUser((user: any, cb: any) => {
  console.log("deserializeUser");
  cb(null, user);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`...Server is running at ${hostName}:${port}`);
});
