const { Sequelize } = require("sequelize");

const db = new Sequelize("travapp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
