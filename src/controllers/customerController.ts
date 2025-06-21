import { NextFunction, Request, response, Response } from "express";
import { CustomerModel } from "../models/customer";
import mongoose from "mongoose";
import { ApiError } from "../errors/apiError";

export const createCustomer = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const customer = new CustomerModel(req.body);
    await customer.save();
    resp.status(201).json(customer);
  } catch (error: any) {
    next(error);
  }
};

export const getCustomers = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const customer = await CustomerModel.find();
    resp.status(200).json(customer);
  } catch (error: any) {
    next(error);
  }
};

export const getCustomerById = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const customerById = await CustomerModel.findById(req.params.id);
    if (!customerById) {
      throw new ApiError(404, "Customer not found");
    }
    resp.status(200).json(customerById);
  } catch (error: any) {
    next(error);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCUstomer = await CustomerModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCUstomer) {
      throw new ApiError(404, "Customer not found ");
    }
    res.status(200).json({ message: "Customer deleted" });
  } catch (error: any) {
    next(error);
  }
  //
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCustomer) {
      throw new ApiError(404, "Customer not found");
    }
    res.status(200).json(updateCustomer);
  } catch (error: any) {
    next(error);
  }
};
