import { Router } from "express";
import {
  login,
  logOut,
  refreshToken,
  SignUp,
} from "../controllers/auth.controller";
import { getUsers } from "../controllers/auth.getController";
import { authenticateToken } from "../middleware/authenticateToken";

const UserRouter = Router();

UserRouter.post("/signup", SignUp);
UserRouter.post("/login", login);
UserRouter.post("/logout", logOut);
UserRouter.get("/users", authenticateToken, getUsers);
UserRouter.post("/refresh-token", refreshToken);

//access token

export default UserRouter;
