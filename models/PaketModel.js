const { Sequelize, ENUM } = require ("sequelize");
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

        provinsi_pengirim:{
            type:DataTypes.STRING(40),
            allowNull:false
        },

        provinsi_penerima:{
            type:DataTypes.STRING(40),
            allowNull:false
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

        isi_paket:{
            type:DataTypes.STRING(25),
            allowNull:false
        },
        
        kota_kab_pengirim:{
            type:DataTypes.STRING(10),
            allowNull:false
        },

        kota_kab_penerima:{
            type:DataTypes.STRING(10),
            allowNull:false
        },

        kecamatan_pengirim:{
            type:DataTypes.STRING(25),
            allowNull:false
        },

        kecamatan_penerima:{
            type:DataTypes.STRING(25),
            allowNull:false
        },
         
        kelurahan_pengirim:{
            type:DataTypes.STRING(25),
            allowNull:false
        },
        kelurahan_penerima:{
            type:DataTypes.STRING(25),
            allowNull:false
        },

        status : {
            type: DataTypes.ENUM(["Diproses","Diterima"]),
            allowNull: false,
            defaultValue : "Diproses"
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

module.exports = Paket