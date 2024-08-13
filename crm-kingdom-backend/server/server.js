import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import router from '../routes/app.route.js';

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
});
