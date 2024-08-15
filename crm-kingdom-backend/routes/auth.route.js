import { Router } from "express";
import { SignUp , Login } from "../controllers/auth.controller.js";
const router = Router();

router.post("/login",Login);
export default router;
