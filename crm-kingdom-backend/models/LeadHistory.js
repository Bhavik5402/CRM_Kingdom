import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";
import User from "./Users.js";
import Stage from "./Stage.js";

const LeadHistory = sequelize.define(
    "LeadHistory",
    {
        leadhistoryid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        leadid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "leads", // Name of the table to reference
                key: "leadid",
            },
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users", // Name of the table to reference
                key: "userid",
            },
        },
        oldstageid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "stage", // Name of the table to reference
                key: "stageid",
            },
        },
        newstageid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "stage", // Name of the table to reference
                key: "stageid",
            },
        },
        remark: {
            type: DataTypes.TEXT,
        },
        createddate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    },
    {
        tableName: "leadhistory", // explicitly define table name to match your existing table
        timestamps: false, // if you don't have `createdAt` and `updatedAt` columns
    }
);

// Define associations
LeadHistory.belongsTo(User, { foreignKey: "userid" });
LeadHistory.belongsTo(Stage, { as: "previouseStage", foreignKey: "oldstageid" });
LeadHistory.belongsTo(Stage, { as: "newState", foreignKey: "newstageid" });

export default LeadHistory;
