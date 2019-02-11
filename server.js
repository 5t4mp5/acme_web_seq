const {syncDataBase, seedDb} = require ('./db');

syncDataBase()
    .then(() => console.log('db sync done'))
    .then(() => seedDb())
    .then(() => console.log('db seed done'))
    .catch(err => err);


