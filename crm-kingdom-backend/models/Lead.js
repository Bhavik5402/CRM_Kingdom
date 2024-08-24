import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";
import User from "./Users.js";

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
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        stateid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true, // This ensures the string is not empty
            },
        },
        cityid: {
            type: DataTypes.INTEGER,
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
        managerphonenumber: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: false, // This ensures the string is not empty
            },
        },
        managerwhatsappnumber: {
            type: DataTypes.STRING(10),
        },
        stageid: {
            type: DataTypes.INTEGER,
            references: {
                model: "stage",
                key: "stageid",
            },
            allowNull: false,
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
        deletedby: {
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
Lead.belongsTo(User, { as: "users", foreignKey: "createdby" });
export default Lead;
