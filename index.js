const {initDb} = require('./db');
const app = require('./api');

initDb()
    .then(() => {
        app.listen(3000, () => {
            console.log('server is listening');
        })
    })
    .catch(e => {
        console.error(e);
        process.exit(1);
    })

