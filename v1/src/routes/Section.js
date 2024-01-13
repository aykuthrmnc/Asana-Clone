import { Router } from "express";
import SectionController from "../controllers/Section.js";
import { createValidation, updateValidation } from "../validations/Sections.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

router.get("/:projectId", authenticate, SectionController.index);
router.post("/", authenticate, validate(createValidation), SectionController.create);
router.patch("/:id", authenticate, validate(updateValidation), SectionController.update);
router.delete("/:id", authenticate, SectionController.deleteSection);

export default router;
