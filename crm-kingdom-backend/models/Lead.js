import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Lead = sequelize.define(
    "Lead",
    {
        leadid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        companyname: {
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
        whatsappnumber: {
            type: DataTypes.STRING(10),
        },
        website: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: false, // This ensures the string is optional and can be empty
            },
        },
        countryid: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        stateid: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        cityid: {
            type: DataTypes.NUMBER,
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        address: {
            type: DataTypes.TEXT,
        },
        managerusername: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        manageremailid: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        instagram: {
            type: DataTypes.STRING(100),
        },
        facebook: {
            type: DataTypes.STRING(100),
        },
        linkedin: {
            type: DataTypes.STRING(100),
        },
        remark: {
            type: DataTypes.TEXT,
        },
        createdby: {
            type: DataTypes.INTEGER,
            references: {
                model: "users", // Name of the table to reference
                key: "userid",
            },
            allowNull: false,
        },
        createddate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedby: {
            type: DataTypes.INTEGER,
            references: {
                model: "users", // Name of the table to reference
                key: "userid",
            },
            allowNull: true,
        },
        updateddate: {
            type: DataTypes.DATE,
        },
        deleteddby: {
            type: DataTypes.INTEGER,
            references: {
                model: "users", // Name of the table to reference
                key: "userid",
            },
            allowNull: true,
        },
        deleteddate: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "leads", // explicitly define table name to match your existing table
        timestamps: false,
    }
);

export default Lead;
