import express from "express";
import { login, logout, register, refreshToken } from "../controllers/auth.js";
import { getCurrentUser, updateUser } from "../controllers/user.js";
import authMiddleware from "../middlewares/auth.js";
import refreshAuthMiddleware from "../middlewares/refreshAuth.js";
import uploadMiddleware from "../middlewares/upload.js";


const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.post("/refreshing", refreshAuthMiddleware, refreshToken);
authRouter.get("/current", authMiddleware, getCurrentUser);
authRouter.patch(
  "/update",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  updateUser
);


export default authRouter;
