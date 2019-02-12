const db = require('./db');
const {Page, Content} = require('./models');

function initDb(force = false){
    return db.authenticate()
        .then(() => {
            Page.hasOne(Content);
            Content.belongsTo(Page);

            return db.sync({force});
        })
}

module.exports = {
    initDb,
    models: {
        Page,
        Content,
    },
};