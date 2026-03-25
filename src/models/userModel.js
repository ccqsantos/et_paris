import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const userModel = sequelize.define('User', 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        role: {
            type: DataTypes.ENUM('USER', 'ADMIN'),
            defaultValue: 'USER',
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
    }
);

export default userModel;