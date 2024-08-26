import { Router } from "express";
import { SignUp , Login, ResetPassword, forgotPassword } from "../controllers/auth.controller.js";
const router = Router();

router.post("/login",Login);
router.post("/reset-password",ResetPassword);
router.post("/forgot-password",forgotPassword);
export default router;
