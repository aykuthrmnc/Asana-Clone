import { Router } from "express";
import { index, create, update, deleteSection } from "../controllers/Sections.js";
import { createValidation, updateValidation } from "../validations/Sections.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

router.get("/:projectId", authenticate, index);
router.post("/", authenticate, validate(createValidation), create);
router.patch("/:id", authenticate, validate(updateValidation), update);
router.delete("/:id", authenticate, deleteSection);

export default router;
