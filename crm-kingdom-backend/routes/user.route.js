import { Router } from "express";
import { CreateUser, DeleteUser, EditUser, GetAllUsers, GetAllUsersByLeadId, GetUserById } from "../controllers/user.controller.js";
import protectRoute from "../utils/protected.route.js";
const router = Router();

router.post("/get-all",protectRoute,GetAllUsers);
router.post("/get",protectRoute,GetUserById);
router.post("/create",protectRoute,CreateUser);
router.post("/update",protectRoute,EditUser);
router.post("/delete",protectRoute,DeleteUser);
router.post("/get/lead-users",protectRoute,GetAllUsersByLeadId);
export default router;
