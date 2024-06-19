import express from "express";
import { createTest, getAllTests, getTestById } from "../controllers/test.js";

const testRouter = express.Router();
testRouter.get("/", getAllTests);
testRouter.get("/:id", getTestById);
testRouter.post("/", createTest);

export default testRouter;
