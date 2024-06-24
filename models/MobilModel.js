const { Sequelize } = require ("sequelize");
const { DataTypes } = Sequelize;
const db = require('../config/Database');

const Mobil = db.define(
    "Mobil",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },

        nama_mobil:{
            type:DataTypes.STRING(10),
            allowNull:false
        },

        jumlah_seat:{
            type:DataTypes.INTEGER(2),
            allowNull:false
        },
        
    },
    {
        freezeTableName: true,
    }
)

module.exports = Mobil