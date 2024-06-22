import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import Water from "../models/water.js";
import {
  createWaterSchema,
  updateWaterSchema,
} from "../schemas/waterSchemas.js";

export const getWaterRecordsByDay = async (req, res, next) => {
  try {
    const date = new Date();
    const recentYear = date.getFullYear();
    const recentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const recentDay = date.getDate().toString().padStart(2, "0");
    const today = `${recentYear}-${recentMonth}-${recentDay}`;

    const { day = today } = req.query;

    console.log(today);

    const data = await Water.find({ owner: req.user.id });
    const filter = data.filter((el) => el.time.includes(day));

    res.status(200).json(filter);
  } catch (error) {
    next(error);
  }
};

export const getWaterRecordsByMonth = async (req, res, next) => {
  try {
    const date = new Date();
    const recentYear = date.getFullYear();
    const recentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const thisMonth = `${recentYear}-${recentMonth}`;

    const { month = thisMonth } = req.query;

    const data = await Water.find({ owner: req.user.id });
    const filter = data.filter((el) => el.time.includes(month));

    res.status(200).json(filter);
  } catch (error) {
    next(error);
  }
};

export const createWaterRecord = async (req, res, next) => {
  try {
    const { error } = createWaterSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const newRecord = await Water.create({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json(newRecord);
  } catch (error) {
    next(error);
  }
};

export const updateWaterRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw HttpError(400, `${id} is not valid id`);
    const { error } = updateWaterSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    if (!req.body || Object.keys(req.body).length === 0)
      throw HttpError(400, "Body must have at least one field");

    const data = await Water.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteWaterRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw HttpError(400, `${id} is not valid id`);

    const data = await Water.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (data === null) throw HttpError(404);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
