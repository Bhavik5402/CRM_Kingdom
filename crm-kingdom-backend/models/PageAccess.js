import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const PageAccess = sequelize.define(
    "PageAccess",
    {
        pageid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        createddate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updateddate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deleteddate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "pageaccess",
        timestamps: false, // Disable automatic timestamp fields like 'createdAt' and 'updatedAt'
    }
);


export default PageAccess;
