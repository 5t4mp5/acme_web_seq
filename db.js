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
                    body: "<p>Welcome Home 1</p><p>Welcome Home 2</p>"
                });
                await homeContent.save();
                homeContent.setPage(1);

                const employeesContent = new Content({
                    body: '<p>Moe\nCEO</p><p>Larry\nCOO</p><p>CURLY\nCOO</p>'
                });
                await employeesContent.save();
                employeesContent.setPage(2);

                const contactContent = new Content({
                    body: '<p>Phone\n212-555-1212</p><p>Telex\n212-555-1213</p><p>FAX\n212-555-1214</p>'
                });
                await contactContent.save();
                contactContent.setPage(3);
            }
        });
}

module.exports = {syncDataBase, seedDb};