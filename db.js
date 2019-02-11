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

function itExists(table, id){
    return table.count({where: {id: id}})
        .then(count => {
            if(count > 0){
                return true;
            }
            return false;
        });
}

function seedDb(){
    itExists(Page, 1)
        .then(async itExists =>  {
            if(!itExists){
                const home = new Page({
                    title: 'Home'
                });
            
                const employees = new Page({
                    title: 'Employees'
                });
            
                const contact = new Page({
                    title: 'Contact'
                });

                await home.save();
                await employees.save();
                await contact.save();

                const homeContent = new Content({
                    body: '<ul class="list-group"><li class="list-group-item">Welcome Home 1<br> XOXOXO</li><li class="list-group-item">Welcome Home 2<br> XOXOXO</li></ul>'
                });
                await homeContent.save();
                homeContent.setPage(1);

                const employeesContent = new Content({
                    body: '<ul class="list-group"><li class="list-group-item">MOE<br>CEO</li><li class="list-group-item">LARRY<br>CTO</li><li class="list-group-item">CURLY<br>COO</li></ul>'
                });
                await employeesContent.save();
                employeesContent.setPage(2);

                const contactContent = new Content({
                    body: '<ul class="list-group"><li class="list-group-item">Phone<br>212-555-1212</li><li class="list-group-item">Telex<br>212-555-1213</li><li class="list-group-item">Fax<br>212-555-1214</li></ul>'
                });
                await contactContent.save();
                contactContent.setPage(3);
            }
        });
}

function getBody(pageTitle){
    return Page.findOne({where: {title: pageTitle}})
        .then(page => page.id)
        .then(id => Content.findOne({where:{pageId: id}}))
        .then(content => content.body)
}

module.exports = {syncDataBase, seedDb, getBody};