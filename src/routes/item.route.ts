import { Router } from "express";
import {
  createItem,
  deleteItem,
  findItemById,
  getItems,
} from "../controllers/ItemController";

const ItemRouter = Router();
ItemRouter.post("/", createItem);
ItemRouter.get("/", getItems);
ItemRouter.get("/:id", findItemById);
ItemRouter.delete("/:id", deleteItem);

export default ItemRouter;
