const {initDb} = require('./db');
const app = require('./api');
const initAndSeed = require('./db/seed')

const port = process.env.port || 3000;

initAndSeed()
    .then(() => {
        app.listen(port, () => {
            console.log('server is listening');
        })
    })
    .catch(e => {
        console.error(e);
        process.exit(1);
    })

