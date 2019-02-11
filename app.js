const express = require('express');
const app  = express();
const db = requiire('db');

const renderPage = (body, name)=> {
    return `
        <html>
        <head>
          <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' />
          <title>Acme: ${name}</title>
        </head>
        <body>
          <div class='container'>
            <h1>Acme Web</h1>
            <h2>${name}</h2>
            <ul class='nav nav-tabs'>
              <li class='nav-item'>
                <a href='/home' class='${name === 'Home' ? 'nav-link active' :  'nav-link'}'>Home</a>
              </li>
              <li class='nav-item'>
              <a href='/employees' class='${name === 'Employees' ? 'nav-link active' :  'nav-link'}'>Employees</a>
              </li>
              <li class='nav-item'>
              <a href='/contact' class='${name === 'Contact' ? 'nav-link active' :  'nav-link'}'>Contact</a>
              </li>
            </ul>
            <div>
              ${body}
            </div>
          </div>
        </body>
        </html>
      `;
  };

app.get('/', (req, res) => res.redirect('/home'));

//TODO Replace hard coded body text with sequelize calls to db

app.get('/home', (req, res, next) => {
    res.send(renderPage(db.getBody('Home').catch(next), 'Home'));
});

app.get('/employees', (req, res, send) => {
    res.send(renderPage(db.getBody('Employees').catch(next), 'Employees'));
});

app.get('/contact', (req, res, next) => {
    res.send(renderPage(db.getBody('Contact').catch(next), 'Contact'));
});

module.exports = app;