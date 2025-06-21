import mongoose from "mongoose";

type Customer = {
  
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

const customerSchema = new mongoose.Schema<Customer>({
  
  name: {
    type: String,
    minlength: [3, "name must be at least 2 characters long"],
    required: [true, "name is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "User already registered"],
    trim: true,
    index: true,
    lowercase: true,
    match: [
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Please fill a valid email address",
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, "phone number is required"],
    minlength: [10, "phone number must be at least 10 characters long"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
    minlength: [5, "address must be at least 5 characters long"],
    trim: true,
  },
});

export const CustomerModel = mongoose.model("Customer", customerSchema);
