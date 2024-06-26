import express from "express";
import { getCustomers } from "../controllers/customers.js";

const customersRouter = express.Router();

customersRouter.get("/", getCustomers);

export default customersRouter;
