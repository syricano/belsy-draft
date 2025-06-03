import db_connection from "../config/db_connection.js";
import User from "./user.js";
import Table from "./table.js";
import Reservation from "./reservation.js";

(() => {
  User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
  Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Table.hasMany(Reservation, { foreignKey: 'tableId', as: 'reservations' });
  Reservation.belongsTo(Table, { foreignKey: 'tableId', as: 'table' });

  // Now sync the DB
//   db_connection.sync({ alter: true })
//     .then(() => {
//       console.log("Database & tables created!");
//     })
//     .catch((error) => {
//       console.error("Error creating database & tables:", error);
//     });
})();