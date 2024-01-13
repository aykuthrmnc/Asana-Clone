import Joi from "joi";

export const createValidation = Joi.object({
  title: Joi.string().required().min(3),
  section_id: Joi.string().required().min(8),
  project_id: Joi.string().required().min(8),
  description: Joi.string(),
  assigned_to: Joi.string(),
  due_date: Joi.string(),
  statuses: Joi.array(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  comments: Joi.array(),
  media: Joi.array(),
});

export const updateValidation = Joi.object({
  title: Joi.string().min(3),
  section_id: Joi.string().min(8),
  project_id: Joi.string().min(8),
  description: Joi.string(),
  assigned_to: Joi.string(),
  due_date: Joi.string(),
  statuses: Joi.array(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  comments: Joi.array(),
  media: Joi.array(),
});

export const commentValidation = Joi.object({
  _id: Joi.string().min(8),
  comment: Joi.string().min(3),
});
