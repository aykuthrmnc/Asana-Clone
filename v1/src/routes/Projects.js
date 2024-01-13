import { Router } from "express";
import { index, create, update, deleteProject } from "../controllers/Projects.js";
import { createValidation, updateValidation } from "../validations/Projects.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

router.get("/", authenticate, index);
router.post("/", authenticate, validate(createValidation), create);
router.patch("/:id", authenticate, validate(updateValidation), update);
router.delete("/:id", authenticate, deleteProject);

export default router;
