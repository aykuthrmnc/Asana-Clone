import Joi from "joi";

export const getValidation = Joi.object({
  projectId: Joi.string().required(),
});


export const createValidation = Joi.object({
  name: Joi.string().required().min(3),
  project_id: Joi.string().required().min(8),
});

export const updateValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3),
  project_id: Joi.string().min(8),
});

export const deleteValidation = Joi.object({
  id: Joi.string().required(),
});