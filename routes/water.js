import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  createWaterRecord,
  deleteWaterRecord,
  getWaterRecordsByDay,
  getWaterRecordsByMonth,
  updateWaterRecord,
} from "../controllers/water.js";

const waterRouter = express.Router();
waterRouter.post("/", authMiddleware, createWaterRecord);
waterRouter.put("/:id", updateWaterRecord);
waterRouter.delete("/:id", deleteWaterRecord);
waterRouter.get("/day", getWaterRecordsByDay);
waterRouter.get("/month", getWaterRecordsByMonth);

export default waterRouter;
