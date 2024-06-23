import { Schema, model } from "mongoose";
import "dotenv/config";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "User",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Man", "Woman"],
      default: "Woman",
    },
    waterNorm: {
      type: Number,
      default: 2000,
    },
    weight: {
      type: Number,
      default: 0,
    },
    timeActive: {
      type: Number,
      default: 0,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

export default User;
