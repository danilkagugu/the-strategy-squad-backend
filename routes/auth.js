import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/auth.js";
import authMiddleware from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/current", authMiddleware, getCurrentUser);

export default authRouter;
