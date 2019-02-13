const express = require('express');
const {models, initDb} = require('../db');
const renderPage = require('../renderPage');
const app = express();

app.get('/', (req, res) => {
    models.Page.findByPk(1, {include: models.Content})
        .then(page => res.send(renderPage(page.content.body, page.title)))
        .catch(next); 
})

app.get('/:id', (req, res, next) => {
    const{params: {id}} = req;
    if([1,2,3].includes(parseInt(id))){
        models.Page.findByPk(parseInt(id), {include: models.Content})
        .then(page => res.send(renderPage(page.content.body, page.title)))
        .catch(next);
    }else{
        res.status(404).send();
    }
    
});

module.exports = app;
