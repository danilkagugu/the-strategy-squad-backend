import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import { getCurrentUser, updateUser } from "../controllers/user.js";
import authMiddleware from "../middlewares/auth.js";
import uploadMiddleware from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);

authRouter.get("/current", authMiddleware, getCurrentUser);
authRouter.patch(
  "/update",
  authMiddleware,
  uploadMiddleware.fields([
    { name: "avatar", maxCount: 1 },
    { name: "name", maxCount: 1 },
    { name: "weight", maxCount: 1 },
    { name: "gender", maxCount: 1 },
    { name: "waterNorm", maxCount: 1 },
    { name: "timeActive", maxCount: 1 },
  ]),
  updateUser
);

export default authRouter;
