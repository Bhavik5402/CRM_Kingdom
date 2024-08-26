import { Router } from "express";
import protectRoute from "../utils/protected.route.js";
import {
    CreateLead,
    DeleteLead,
    EditLead,
    GetAllLeads,
    GetLeadById,
} from "../controllers/lead.controller.js";
import { fieldValidatorMiddleware } from "../utils/fieldValidation.middleware.js";
const router = Router();

router.post("/create",protectRoute,CreateLead);
router.post("/get", protectRoute, GetLeadById);
router.post("/get-all", protectRoute, GetAllLeads);
router.post("/update", protectRoute, EditLead);
router.post("/delete", protectRoute, DeleteLead);
export default router;
