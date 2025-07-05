import { Router } from "express";
import {
  createItem,
  deleteItem,
  findItemById,
  getItems,
} from "../controllers/ItemController";
import { authenticateToken } from "../middleware/authenticateToken";

const ItemRouter = Router();

ItemRouter.use(authenticateToken);
ItemRouter.post("/", createItem);
ItemRouter.get("/", getItems);
ItemRouter.get("/:id", findItemById);
ItemRouter.delete("/:id", deleteItem);

export default ItemRouter;
