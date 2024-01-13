import { Router } from "express";
import UserController from "../controllers/User.js";
import { changePasswordValidation, createValidation, loginValidation, resetPasswordValidation, updateValidation } from "../validations/Users.js";
import { authenticate, validate } from "../middlewares/index.js";

const router = Router();

router.get("/", UserController.index);
router.post("/", validate(createValidation), UserController.create);
router.patch("/", authenticate, validate(updateValidation), UserController.update);
router.delete("/:id", authenticate, UserController.deleteUser);
router.post("/login", validate(loginValidation), UserController.login);
router.get("/projects", authenticate, UserController.projectList);
router.post("/reset-password", validate(resetPasswordValidation), UserController.resetPassword);
router.post("/change-password", authenticate, validate(changePasswordValidation), UserController.changePassword);
router.post("/update-profile-image", authenticate, UserController.updateProfileImage);

export default router;
