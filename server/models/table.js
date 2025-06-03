import db_connection from "../config/db_connection.js";
import { DataTypes } from "sequelize";

const table = db_connection.define("Table", {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Seats must be at least 1",
        },
        max: {
          args: 20,
          msg: "Seats cannot exceed 20",
        },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    timestamps: true, 
    tableName: 'tables', 
  });

  export default table;