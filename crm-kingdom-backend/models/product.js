import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        createddate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
    },
    {
        tableName: "product",
        timestamps: false,
    }
);

export default Product;
