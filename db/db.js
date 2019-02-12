const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:/acme_web');

module.exports = sequelize;