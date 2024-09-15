import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';
import User from './Users.js'; // Import the User model for reference

const UserPassword = sequelize.define('UserPassword', {
  userpasswordid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: DataTypes.TEXT, // Use TEXT for large text fields
    allowNull: false, // Ensures that a password must be provided
  },
  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Reference to the User model
      key: 'userid',
    },
    allowNull: false, // Ensures that userid must be provided
  },
}, {
  tableName: 'userpassword', // Explicitly define the table name
  timestamps: false, // Assuming there are no `createdAt` and `updatedAt` columns
});

export default UserPassword;
