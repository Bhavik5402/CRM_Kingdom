import { DataTypes } from 'sequelize';
import User from './Users.js';
import sequelize from '../config/database.config.js';

const Stage = sequelize.define('Stage', {
    stageid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userid: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'userid'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    sequencenumber: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },    
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createddate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    updateddate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deleteddate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'stage',
    timestamps: false,
});

Stage.belongsTo(User, { foreignKey: 'userid' });

export default Stage;
