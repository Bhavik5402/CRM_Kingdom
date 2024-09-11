import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";
import User from "./Users.js";
import Country from "./Country.js"; // Import the Country model
import State from "./State.js";     // Import the State model
import City from "./City.js";       // Import the City model

const Lead = sequelize.define(
    "Lead",
    {
        leadid: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        companyname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        phonenumber: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        whatsappnumber: {
            type: DataTypes.STRING(10),
        },
        website: {
            type: DataTypes.TEXT,
            allowNull: true, // Optional, can be empty
            validate: {
                notEmpty: false,
            },
        },
        country: {
            type: DataTypes.TEXT,
            allowNull: true, // Optional, can be empty
            validate: {
                notEmpty: false,
            },
        },
        state: {
            type: DataTypes.TEXT,
            allowNull: true, // Optional, can be empty
            validate: {
                notEmpty: false,
            },
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: true, // Optional, can be empty
            validate: {
                notEmpty: false,
            },
        },
        // countryid: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Country,
        //         key: "countryid",
        //     },
        //     allowNull: false,
        //     validate: {
        //         notEmpty: true,
        //     },
        // },
        // stateid: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: State,
        //         key: "stateid",
        //     },
        //     allowNull: false,
        //     validate: {
        //         notEmpty: true,
        //     },
        // },
        // cityid: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: City,
        //         key: "cityid",
        //     },
        //     allowNull: false,
        //     validate: {
        //         notEmpty: true,
        //     },
        // },
        address: {
            type: DataTypes.TEXT,
        },
        managerusername: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        manageremailid: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        managerphonenumber: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: false,
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
                model: "users",
                key: "userid",
            },
            allowNull: false,
        },
        leadby: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
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
                model: "users",
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
                model: "users",
                key: "userid",
            },
            allowNull: true,
        },
        deleteddate: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "leads",
        timestamps: false,
    }
);

export default Lead;
