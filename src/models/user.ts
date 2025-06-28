import mongoose from "mongoose";

type User = {
  name: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<User>({
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
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [4, "password  must be at least 10 characters long"],
  },
});

export const UserModel = mongoose.model("signup", userSchema);
