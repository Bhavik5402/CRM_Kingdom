import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Country = sequelize.define(
    "Country",
    {
        countryid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true, // Ensures the name is not empty
            },
        }
    },
    {
        tableName: "countries", // Explicitly define the table name
        timestamps: false,
    }
);

// add Country data if not available


export default Country;
