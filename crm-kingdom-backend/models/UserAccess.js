import { DataTypes } from 'sequelize';
import User from './Users.js';
import PageAccess from './PageAccess.js';
import sequelize from '../config/database.config.js';

const UserAccess = sequelize.define('UserAccess', {
    useraccessid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pageid: {
        type: DataTypes.INTEGER,
        references: {
            model: PageAccess, // 'PageAccess' refers to table name
            key: 'pageid', // 'pageid' refers to column name in PageAccess table
        },
        allowNull: true,
    },
    userid: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // 'User' refers to table name
            key: 'userid', // 'userid' refers to column name in User table
        },
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
    ischecked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'useraccess',
    timestamps: false, // Disable automatic timestamp fields like 'createdAt' and 'updatedAt'
});

export default UserAccess;
