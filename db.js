const { Sequelize, Model, DataTypes } = require('sequelize')
const databaseUrl = 'postgres://postgres:secret@localhost:5432/postgres'
const db = new Sequelize(databaseUrl)

class User extends Model {}
User.init({
    username: DataTypes.STRING,
    email: DataTypes.TEXT,
    password: DataTypes.STRING
},{sequelize: db, modelName: 'user'});

module.exports = { db, User }
