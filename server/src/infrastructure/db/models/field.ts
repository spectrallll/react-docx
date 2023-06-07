
const { sequelize } = require("../db");
const { DataTypes } = require('sequelize')

export const Field = sequelize.define("field", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    variable: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING }
})
