const db = require('../db');

module.exports = db.define ('content', {
    body: {
        type: db.Sequelize.TEXT,
        allowNull: false,
    }
})