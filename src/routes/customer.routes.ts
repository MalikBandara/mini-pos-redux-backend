import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController";
import { authenticateToken } from "../middleware/authenticateToken";

const customerRouter = Router();

customerRouter.use(authenticateToken)

customerRouter.post("/", createCustomer);

customerRouter.get("/", getCustomers);

customerRouter.get("/:id", getCustomerById);

customerRouter.delete("/:id", deleteCustomer);

customerRouter.put("/:id" , updateCustomer);

export default customerRouter;
// This file defines the routes for customer-related operations.
