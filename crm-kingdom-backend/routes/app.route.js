import { Router } from "express";

const router = Router();

router.post("/data", (req, res) => {
    console.log("req: ", req.body);
    res.json({ message: "req received" });
});

export default router;
