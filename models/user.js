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
    refreshToken: {
      type: String,
      default: null,
    },
    tokenTmp: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Man", "Woman", "undefined"],
      default: "undefined",
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
      default:
        "https://res.cloudinary.com/dy5sxwt2g/image/upload/v1719326607/avatars/w2j6rgne6vkiwulmq2ar.png",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

export default User;
