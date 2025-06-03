import db_connection from "../config/db_connection.js";
import { DataTypes } from "sequelize";

const Reservation = db_connection.define("Reservation", {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
            len: {
            args: [4, 50],
            msg: "Customer name must be between 8 and 50 characters long",
            },
            notEmpty: {
                msg: "Customer name cannot be empty",
            },
        },
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: true,
        validate: {
            is: {
            args: [/^\+?[1-9]\d{1,14}$/],
            msg: "Phone number must be a valid international format",
            },
            len: {
            args: [10, 15],
            msg: "Phone number must be between 10 and 15 digits long",
            },
        }
    },
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false,
        validate: {
            isDate: {
            msg: "Reservation date must be a valid date",
            },
            notEmpty: {
            msg: "Reservation date cannot be empty",
            },
            isAfter: {
            args: new Date().toISOString(),
            msg: "Reservation date must be in the future",
            }
            
        }

    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 20,
        isInt: {
          msg: "Guests must be an integer between 1 and 20",
        },
        notEmpty: {
          msg: "Guests cannot be empty",
        },
        
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending',
        allowNull: false,

    }
   
    
  });

  export default Reservation;