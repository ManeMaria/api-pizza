const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const localDataBase = require('./config/database');

const routes = require('./routes/routes');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.mongo();
    this.routes();
  }

  middlewares() {
    this.server.use(morgan('dev'));
    this.server.use(express.json());
  }

  mongo() {
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.connect(localDataBase.local.localUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, { useNewUrlParser: true }).then(
      () => {
        // eslint-disable-next-line no-console
        console.log('a base foi conectada com sucesso');
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      },
    );
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
