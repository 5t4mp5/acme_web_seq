const {Page, Content} = require ('./models');
const {initDb} = require('./index');

initDb(true)
    .then(() => {
        const createPages = Promise.all([Page.create({title: 'Home',}), Page.create({title: 'Employees',}), Page.create({title: 'Contact',})]);
        const createContent = Promise.all([
            Content.create({body: '<ul class="list-group"><li class="list-group-item">Welcome Home 1<br> XOXOXO</li><li class="list-group-item">Welcome Home 2<br> XOXOXO</li></ul>'}),
            Content.create({body: '<ul class="list-group"><li class="list-group-item">MOE<br>CEO</li><li class="list-group-item">LARRY<br>CTO</li><li class="list-group-item">CURLY<br>COO</li></ul>'}),
            Content.create({body: '<ul class="list-group"><li class="list-group-item">Phone<br>212-555-1212</li><li class="list-group-item">Telex<br>212-555-1213</li><li class="list-group-item">Fax<br>212-555-1214</li></ul>'})
        ]);

        console.log('create content', createContent);
        
        return Promise.all([createPages, createContent]);
    })
    .then(([pages, contents]) => {
        const [home, emp, contact] = pages;
        const [homeCont, empCont, contCont] = contents;

        return Promise.all([pages[0].setContent(contents[0]), pages[1].setContent(contents[1]), pages[2].setContent(contents[2])]);
    })
    .then(() => {
        console.log('db seeded');
        process.exit(0);
    })
    .catch(e => {
        console.error(e)
        process.exit(1);
    });