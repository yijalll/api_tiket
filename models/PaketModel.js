const { Sequelize } = require ("sequelize");
const { DataTypes } = Sequelize;
const db = require('../config/Database');
const Users = require("./UserModel");
const KotaModel = require("./KotaModel");

const Paket = db.define(
    "Paket",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        kota_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: KotaModel,
                key: 'id'
            }
        },

        alamat_pickup:{
            type:DataTypes.STRING(40),
            allowNull:false
        },

        alamat_deliv:{
            type:DataTypes.STRING(40),
            allowNull:false
        },
        nama_penerima:{
            type:DataTypes.STRING(25),
            allowNull:false
        },

        telp_penerima:{
            type:DataTypes.INTEGER(15),
            allowNull:false
        },
        nama_pengirim:{
            type:DataTypes.STRING(25),
            allowNull:false
        },

        telp_pengirim:{
            type:DataTypes.INTEGER(15),
            allowNull:false
        },

        status:{
            type:DataTypes.STRING(10),
            allowNull:false
        },

        keterangan:{
            type:DataTypes.STRING(25),
            allowNull:false
        },
        id_user:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: Users,
                key: 'id'
            }
        },

        
    },
    {
        freezeTableName: true,
    }
)

//relasi
Users.hasMany(Paket,{foreignKey:"id_user"})
Paket.belongsTo(Users,{foreignKey:"id_user"})
KotaModel.hasMany(Paket,{foreignKey:"kota_id"})
Paket.belongsTo(KotaModel,{foreignKey:"kota_id"})

module.exports = Paket