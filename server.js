const {syncDataBase, seedDb} = require ('./db');
const app = require ('./app');

const port = process.env.port || 1337;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    syncDataBase()
    .then(() => console.log('db sync done'))
    .then(() => seedDb())
    .then(() => console.log('db seed done'))
    .catch(err => err);
});




