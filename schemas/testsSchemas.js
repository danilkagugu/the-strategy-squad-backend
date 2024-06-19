import Joi from "joi";

export const createTestSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
});
