import sequelize from 'sequelize';

const db_connection = new sequelize(process.env.PG_URL, {
    dialect: 'postgres',
})

// Test the database connection
db_connection.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default db_connection;