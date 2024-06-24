const { Sequelize } = require ("sequelize");
const { DataTypes } = Sequelize;
const db = require('../config/Database');
const Mobil = require("./MobilModel");
const Kota = require("./KotaModel");
const KotaModel = require("./KotaModel");

const Jurusan = db.define(
    "Jurusan",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },

        kota_id:{
            type:DataTypes.INTEGER(11),
            allowNull:false,
            references: {
                model: Kota,
                key: 'id'
            }
        },

        jam:{
            type:DataTypes.TIME,
            allowNull:false
        },

        tanggal:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },

        harga:{
            type:DataTypes.INTEGER(),
            allowNull:false
        },

        mobil_id:{
            type:DataTypes.INTEGER(),
            references:{
                model: Mobil,
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true,
    }
)

//references
Mobil.hasMany(Jurusan,{foreignKey:"mobil_id"})
Jurusan.belongsTo(Mobil,{foreignKey:"mobil_id"})
KotaModel.hasMany(Jurusan,{foreignKey:"kota_id"})
Jurusan.belongsTo(KotaModel,{foreignKey:"kota_id"})

module.exports = Jurusan