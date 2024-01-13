import { Router } from "express";
import ProjectController from "../controllers/Project.js";
import { createValidation, updateValidation } from "../validations/Projects.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

router.get("/", authenticate, ProjectController.index);
router.post("/", authenticate, validate(createValidation), ProjectController.create);
router.patch("/:id", authenticate, validate(updateValidation), ProjectController.update);
router.delete("/:id", authenticate, ProjectController.deleteProject);

export default router;
