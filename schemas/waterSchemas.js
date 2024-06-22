import Joi from "joi";
const timeRegex =
  /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])-(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export const createWaterSchema = Joi.object({
  amount: Joi.number().max(5000).min(0),
  time: Joi.string().regex(timeRegex).required(),
});

export const updateWaterSchema = Joi.object({
  amount: Joi.number().max(5000).min(1),
  time: Joi.string().regex(timeRegex),
});
