import { Sequelize } from "sequelize"
import initialize from "../models/index.js"

const sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.pg_username,
    password: process.env.pg_password,
    database: process.env.pg_database,
    host: process.env.pg_host,
    port: process.env.pg_port,
    logging: false
})

// Setup
try {
    // Testing connection
    await sequelize.authenticate();

    // Initialize models
    initialize(sequelize)

    // Sync
    await sequelize.sync({
        force: true
    })

    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export default (_, res, next) => {
    res.sequelize = sequelize
    next()
}