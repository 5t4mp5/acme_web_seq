db = require('../db')

module.exports = db.define('page', {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }
});