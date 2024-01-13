import { Router } from "express";
import SectionController from "../controllers/Section.js";
import { getValidation, createValidation, updateValidation, deleteValidation } from "../validations/Section.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

router.get("/:projectId", authenticate, validate(getValidation), SectionController.index);
router.post("/", authenticate, validate(createValidation), SectionController.create);
router.patch("/:id", authenticate, validate(updateValidation), SectionController.update);
router.delete("/:id", authenticate, validate(deleteValidation), SectionController.deleteSection);

export default router;
