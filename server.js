const express = require('express');
const session = require('express-session');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

app.prepare().then(() => {
  server.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: true
  }));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  server.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log('Server listening at http://localhost:3000');
  });
});
