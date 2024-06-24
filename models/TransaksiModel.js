const { Sequelize } = require ("sequelize");
const { DataTypes } = Sequelize;
const db = require('../config/Database');
const Jurusan = require("./JurusanModel");
const Users = require("./UserModel");

const Transaksi = db.define(
    "Transaksi",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        jurusan_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Jurusan, 
                key: 'id'
            }

        },

        nama:{
            type:DataTypes.STRING(25),
            allowNull: false

        },

        telp:{
            type:DataTypes.STRING(15), 
            allowNull: false

        },

        jk:{
            type:DataTypes.ENUM(['laki-laki','perempuan']),
            allowNull: false
        },



        ispaid:{
            type:DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        user_id:{
            type:DataTypes.INTEGER(),
            allowNull: false,
            references: {
                model: Users,
                key: 'id'
            }
        },

        jumlah_seat:{
            type:DataTypes.INTEGER(2), 
            allowNull: false
        },

        jumlah_bayar:{
            type:DataTypes.INTEGER,
            allowNull: false
        },

        bukti_bayar:{
            type:DataTypes.STRING(150),
            allowNull: false
        },
        
        
        
    },
    {
        freezeTableName: true,
    }
)

//relasi 
Jurusan.hasMany(Transaksi,{foreignKey:"jurusan_id"})
Transaksi.belongsTo(Jurusan,{foreignKey:"jurusan_id"})
Users.hasMany(Transaksi,{foreignKey:"user_id"})
Transaksi.belongsTo(Users,{foreignKey:"user_id"})

module.exports = Transaksi