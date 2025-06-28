import { Router } from "express";
import customerRouter from "./customer.routes";
import ItemRouter from "./item.route";
import UserRouter from "./auth.routes";

const rootRouter = Router();

rootRouter.use("/customers", customerRouter);
rootRouter.use("/item", ItemRouter);
rootRouter.use("/auth", UserRouter);
rootRouter.use("/auth", UserRouter);
rootRouter.use("/auth", UserRouter);

export default rootRouter;
