import dotenv from "dotenv";

const config = () => {
    dotenv.config();
    process.env.NODE_ENV = process.env.NODE_ENV || "development";
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
};

export default {
    config,
};
