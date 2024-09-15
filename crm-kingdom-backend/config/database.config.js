import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import environmentConfig from "./environment.config.js";
environmentConfig.config();
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        port: process.env.DATABASE_PORT,
    }
);

export const syncDatabase = async () => {
    try{
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
        await sequelize.sync({ alter: true, logging: false });
        console.log("Database synchronized successfully.");
    }
    catch(err){
        console.error("Unable to connect to the database:", err);
    }
}

export default sequelize;
