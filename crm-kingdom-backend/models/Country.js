import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const Country = sequelize.define(
    'Country',
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
        },
        iso2: {
            type: DataTypes.CHAR(2),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true, // Ensures the ISO code is not empty
            },
        },
    },
    {
        tableName: 'countries', // Explicitly define the table name
        timestamps: false,
    }
);

export default Country;
