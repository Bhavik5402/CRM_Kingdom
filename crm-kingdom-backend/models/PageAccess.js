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

// add PageAccess data if not available
const pageAccessData = [
    { pageid: 1, name: "Stages" },
    { pageid: 2, name: "Add Stage" },
    { pageid: 3, name: "Lead" },
    { pageid: 4, name: "Lead Processing" },
];

for (const item of pageAccessData) {
    PageAccess.findOrCreate({
        where: { name: item.name },
        defaults: item,
    });
}

export default PageAccess;
