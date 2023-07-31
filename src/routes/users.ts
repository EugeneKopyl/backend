import { Router } from "express";
import { deleteUser, getUser, getUsers } from "../controllers";
import { isAdministratorMiddleware } from "../middlewares/isAdministratorMiddleware";

export const usersRoute = Router();

usersRoute.get("/", isAdministratorMiddleware, getUsers);
usersRoute.post("/delete", isAdministratorMiddleware, deleteUser);
usersRoute.get("/user", getUser);
