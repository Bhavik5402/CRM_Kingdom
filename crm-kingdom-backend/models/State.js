import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import Country from './Country.js';

const State = sequelize.define(
    'State',
    {
        stateid: {
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
            validate: {
                notEmpty: true, // Ensures the ISO code is not empty
            },
        },
        countryid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'countries',
                key: 'countryid',
            },
            allowNull: false,
        },
    },
    {
        tableName: 'states',
        timestamps: false,
    }
);

State.belongsTo(Country, { foreignKey: 'countryid' });



export default State;
