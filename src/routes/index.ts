import { Router } from 'express';
import customerRouter from './customer.routes';
import ItemRouter from './item.route';

const rootRouter   = Router(); 

rootRouter.use("/customers", customerRouter);
rootRouter.use("/item" , ItemRouter)

export default rootRouter;