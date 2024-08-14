import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import router from '../routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 8000;
console.log(process.env);
console.log(dotenv.config());
console.log(process.env.APP_PORT);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
});
    