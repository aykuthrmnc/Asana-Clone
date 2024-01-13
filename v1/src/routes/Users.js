import { Router } from "express";
import { changePassword, create, deleteUser, index, login, projectList, resetPassword, update, updateProfileImage } from "../controllers/Users.js";
import { changePasswordValidation, createValidation, loginValidation, resetPasswordValidation, updateValidation } from "../validations/Users.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

router.get("/", index);
router.post("/", validate(createValidation), create);
router.patch("/", authenticate, validate(updateValidation), update);
router.delete("/:id", authenticate, deleteUser);
router.post("/login", validate(loginValidation), login);
router.get("/projects", authenticate, projectList);
router.post("/reset-password", validate(resetPasswordValidation), resetPassword);
router.post("/change-password", authenticate, validate(changePasswordValidation), changePassword);
router.post("/update-profile-image", authenticate, updateProfileImage);

export default router;
