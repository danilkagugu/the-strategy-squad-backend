import express from "express";
import authRouter from "./auth.js";
import authMiddleware from "../middlewares/auth.js";
import waterRouter from "./water.js";
import customersRouter from "./customers.js";
import googleAuth from "./googleAuth.js";

const router = express.Router();
router.use("/water", authMiddleware, waterRouter);
router.use("/users", authRouter);
router.use("/customers", customersRouter);
router.use("/auth", googleAuth);

export default router;
