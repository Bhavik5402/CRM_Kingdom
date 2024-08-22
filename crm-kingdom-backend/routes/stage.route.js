import { Router } from "express";
import protectRoute from "../utils/protected.route.js";
import { AddStage, DeleteStage, EditStage, GetAllStages, GetStageById } from "../controllers/stage.controller.js";
const router = Router();

router.post("/get-all",protectRoute, GetAllStages);
router.post("/add",protectRoute, AddStage);
router.post("/get",protectRoute, GetStageById);
router.post("/update",protectRoute, EditStage);
router.post("/delete",protectRoute, DeleteStage);
export default router;
