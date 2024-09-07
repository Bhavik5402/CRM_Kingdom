import { Router } from "express";
import protectRoute from "../utils/protected.route.js";
import {
    ChangeLeadStage,
    CreateLead,
    DeleteLead,
    EditLead,
    GetAllCountries,
    GetAllLeads,
    GetCitiesByState,
    GetLeadById,
    GetStatesByCountry,
} from "../controllers/lead.controller.js";
import { fieldValidatorMiddleware } from "../utils/fieldValidation.middleware.js";
const router = Router();

router.post("/create",protectRoute,CreateLead);
router.post("/get", protectRoute, GetLeadById);
router.post("/get-all", protectRoute, GetAllLeads);
router.post("/update", protectRoute, EditLead);
router.post("/delete", protectRoute, DeleteLead);
router.post("/country/list", protectRoute, GetAllCountries);
router.post("/states/list", protectRoute, GetStatesByCountry);
router.post("/city/list", protectRoute, GetCitiesByState);
router.post("/change-stage", protectRoute, ChangeLeadStage);
export default router;
