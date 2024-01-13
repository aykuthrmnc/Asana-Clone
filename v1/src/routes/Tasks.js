import { Router } from "express";
import { index, create, update, deleteTask, makeComment, deleteComment, addSubTask, getTask } from "../controllers/Tasks.js";
import { createValidation, updateValidation, commentValidation } from "../validations/Tasks.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

// TASK
router.get("/", authenticate, index);
router.post("/", authenticate, validate(createValidation), create);
router.patch("/:id", authenticate, validate(updateValidation), update);
router.delete("/:id", authenticate, deleteTask);

// SUBTASK
router.get("/:id", authenticate, getTask);
router.post("/:id/add-sub-task", authenticate, validate(createValidation), addSubTask);

// COMMENT
router.post("/:id/make-comment", authenticate, validate(commentValidation), makeComment);
router.post("/:id/:commentId", authenticate, deleteComment);

export default router;
