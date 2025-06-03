import db_connection from "../config/db_connection.js";
import { DataTypes } from "sequelize";
const User = db_connection.define("User", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 30],
            msg: "Name must be between 2 and 30 characters long",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 30],
            msg: "Name must be between 2 and 30 characters long",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email must be a valid email address",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          is: {
            args: [/^\+?[1-9]\d{1,14}$/],
            msg: "Phone number must be a valid international format",
          },
          len: {
            args: [10, 15],
            msg: "Phone number must be between 10 and 15 digits long",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 30],
            msg: "Password must be between 8 and 30 characters long",
          },
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
    });

export default User;