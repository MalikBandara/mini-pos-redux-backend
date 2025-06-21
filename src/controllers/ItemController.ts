import { NextFunction } from "express";
import { ItemModel } from "../models/item";
import { Request, Response } from "express";
import { ApiError } from "../errors/apiError";

export const createItem = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const item = new ItemModel(req.body);
    await item.save();
    resp.status(201).json(item);
  } catch (error: any) {
    next(error);
  }
};

export const getItems = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const items = await ItemModel.find();
    resp.status(200).json(items);
  } catch (error: any) {
    next(error);
  }
};

export const findItemById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ItemById = ItemModel.findById(req.params.id);
    res.status(202).json(ItemById);
    if (!ItemById) {
      throw new ApiError(404, "Item not found");
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "item deleted", deletedItem });
    if (!deleteItem) {
      throw new ApiError(404, "item not found");
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedItem) {
      throw new ApiError(404, "item not found");
    }

    res.status(200).json({ message: "item updated" });
  } catch (error: any) {
    next(error);
  }
};
