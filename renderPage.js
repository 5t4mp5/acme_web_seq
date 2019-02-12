module.exports = (body, name) => {
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
                <a href='/1' class='${name === 'Home' ? 'nav-link active' :  'nav-link'}'>Home</a>
              </li>
              <li class='nav-item'>
              <a href='/2' class='${name === 'Employees' ? 'nav-link active' :  'nav-link'}'>Employees</a>
              </li>
              <li class='nav-item'>
              <a href='/3' class='${name === 'Contact' ? 'nav-link active' :  'nav-link'}'>Contact</a>
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