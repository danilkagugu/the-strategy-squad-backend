import express from "express";
import authRouter from "./auth.js";
import authMiddleware from "../middlewares/auth.js";
import testRouter from "./testRouter.js";

const router = express.Router();
router.use("/tests", authMiddleware, testRouter);
router.use("/users", authRouter);

export default router;
