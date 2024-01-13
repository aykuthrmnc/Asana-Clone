import Joi from "joi";

export const createValidation = Joi.object({
  full_name: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

export const updateValidation = Joi.object({
  full_name: Joi.string().min(3),
  email: Joi.string().email().min(8),
});

export const loginValidation = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

export const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required().min(8),
});

export const changePasswordValidation = Joi.object({
  password: Joi.string().required().min(8),
});
