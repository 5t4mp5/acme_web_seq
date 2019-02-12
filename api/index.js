const express = require('express');
const {models, initDb} = require('../db');
const renderPage = require('../renderPage');
const app = express();

app.get('/', (req, res) => {
    res.redirect('/1');
})

app.get('/:id', (req, res, next) => {
    const{params: {id}} = req;
    models.Page.findByPk(parseInt(id), {include: models.Content})
        .then(page => res.send(renderPage(page.content.body, page.title)))
    .catch(next);
});

module.exports = app;
