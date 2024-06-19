import HttpError from "../helpers/HttpError.js";
import Test from "../models/test.js";
import { createTestSchema } from "../schemas/testsSchemas.js";

export const getAllTests = async (req, res, next) => {
  try {
    const data = await Test.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getTestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Test.findById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createTest = async (req, res, next) => {
  try {
    const { error } = createTestSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await Test.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
