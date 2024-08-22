import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const User = sequelize.define(
    "User",
    {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        phonenumber: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        address: {
            type: DataTypes.TEXT,
        },
        workdescription: {
            type: DataTypes.TEXT,
        },
        usertype: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdby: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "users", // Name of the table to reference
                key: "userid",
            },
        },
        createddate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updateddate: {
            type: DataTypes.DATE,
        },
        deleteddate: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "users", // explicitly define table name to match your existing table
        timestamps: false, // if you don't have `createdAt` and `updatedAt` columns
    }
);
User.hasMany(User, { as: "users", foreignKey: "createdby" });
export default User;