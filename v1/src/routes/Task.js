import { Router } from "express";
import TaskController from "../controllers/Task.js";
import { getValidation, createValidation, updateValidation, commentValidation } from "../validations/Task.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

// TASK
router.get("/", authenticate, TaskController.index);
router.post("/", authenticate, validate(createValidation), TaskController.create);
router.patch("/:id", authenticate, validate(updateValidation), TaskController.update);
router.delete("/:id", authenticate, TaskController.deleteTask);

// SUBTASK
router.get("/:id", authenticate, validate(getValidation), TaskController.getTask);
router.post("/:id/add-sub-task", authenticate, validate(createValidation), TaskController.addSubTask);

// COMMENT
router.post("/:id/make-comment", authenticate, validate(commentValidation), TaskController.makeComment);
router.post("/:id/:commentId", authenticate, TaskController.deleteComment);

export default router;
