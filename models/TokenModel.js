const sequelize = require ("sequelize");
const db = require("../config/Database")

const {DataTypes} = sequelize;
const Token = db.define('token', {
    token:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
})

module.exports={Token}