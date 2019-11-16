const { Sequelize, Model, DataTypes } = require('sequelize')
const databaseUrl = 'postgres://postgres:secret@localhost:5432/postgres'
const db = new Sequelize(databaseUrl)

class User extends Model {}
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{sequelize: db, modelName: 'chatroom-user'});

module.exports = { db, User }
