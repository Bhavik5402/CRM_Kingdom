
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
import xlsx from "xlsx";
import Product from "../models/product.js";
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
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;
        console.log("req.file: ", req.file);

        // Read and parse the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Insert the parsed data into the Product table
        const products = data.map((row) => ({
            id: row["id"], // Ensure the column names match those in the Excel file
            price: row["price"],
            name: row["name"],
            createddate: row["createddate"],
        }));

        await Product.bulkCreate(products);

        res.status(200).json({ message: "Data successfully inserted into the Product table." });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred while inserting data." });
    }
});

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
});
