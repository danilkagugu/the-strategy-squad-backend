import express from "express";
import authRouter from "./auth.js";
import authMiddleware from "../middlewares/auth.js";
import waterRouter from "./water.js";

const router = express.Router();
router.use("/water", authMiddleware, waterRouter);
router.use("/users", authRouter);

export default router;
