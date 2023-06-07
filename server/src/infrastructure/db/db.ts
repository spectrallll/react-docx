const { Sequelize } = require("sequelize");

export const sequelize = new Sequelize(
    "postgres",
    "postgres",
    "postgres",
    {
        dialect: "postgres",
        host: "localhost",
        port: "5432"
    }
)
