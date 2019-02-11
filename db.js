const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/acme_web');

const Page = db.define('page', {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }
});

const Content = db.define('content', {
    body: db.Sequelize.STRING,
});



async function syncDataBase(){
    Content.belongsTo(Page);
    Page.hasOne(Content);
    await Page.sync();
    await Content.sync();
}

module.exports = syncDataBase;