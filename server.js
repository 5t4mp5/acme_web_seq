const syncDataBase = require ('./db');

syncDataBase()
    .then(() => console.log('db sync done'))
    .catch(err => err);
