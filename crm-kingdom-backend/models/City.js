import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import State from './State.js';

const City = sequelize.define(
    'City',
    {
        cityid: {
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
        stateid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'states',
                key: 'stateid',
            },
            allowNull: false,
        },
    },
    {
        tableName: 'cities',
        timestamps: false,
    }
);

City.belongsTo(State, { foreignKey: 'stateid' });

export default City;
