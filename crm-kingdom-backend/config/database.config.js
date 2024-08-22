import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
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
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection to the database has been established successfully.");
        return sequelize.sync({ alter: true, logging: false });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
export default sequelize;