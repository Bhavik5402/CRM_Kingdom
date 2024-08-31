
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import router from "../routes/auth.route.js";
import userRouter from "../routes/user.route.js";
import leadRouter from "../routes/lead.route.js";
import stageRouter from '../routes/stage.route.js';
import Multer from "multer";
import { uploadExcel } from "../controllers/upload.controller.js";
import protectRoute from "../utils/protected.route.js";
dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 8000;
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());

app.use("/", router);
app.use("/users", userRouter);

app.use("/leads", leadRouter);

app.use("/stage", stageRouter);

const upload = Multer({ dest: "uploads/" }); // Files will be temporarily stored in 'uploads/' directory

// Route to handle file upload and data insertion
app.post("/upload",protectRoute, upload.single("file"), uploadExcel);

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
});
