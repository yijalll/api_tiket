const { Sequelize } = require ("sequelize");
const { DataTypes } = Sequelize;
const db = require('../config/Database');

const KotaModel = db.define(
    "Kota",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },

        nama_kota:{
            type:DataTypes.STRING(15),
            allowNull:false
        },
        
    },
    {
        freezeTableName: true,
    }
)

module.exports = KotaModel