import { Router } from "express";
import { login, SignUp } from "../controllers/auth.controller";
import { getUsers } from "../controllers/auth.getController";

const UserRouter = Router();

UserRouter.post("/signup", SignUp);
UserRouter.get("/users", getUsers);
UserRouter.post("/login", login);

export default UserRouter;
