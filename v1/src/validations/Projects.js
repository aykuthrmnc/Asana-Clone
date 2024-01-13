import Joi from "joi";

export const createValidation = Joi.object({
  name: Joi.string().required().min(5),
});

export const updateValidation = Joi.object({
  name: Joi.string().required().min(5),
});
