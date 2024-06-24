const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/Database");
const { RefreshToken } = require("../controller/RefreshToken");

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: true
      }
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: {
          args: [["admin", "user"]],
          msg: "Role must be either 'admin' or 'user'",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Users;
