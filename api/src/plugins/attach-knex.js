'use strict';

let Knex = require('knex');
let knexConfiguration = require('./../../knexfile.js');

const attachKnex = {};
attachKnex.register = (server, options, next) => {
  const environment = process.env.NODE_ENV || 'development';
  console.log(knexConfiguration[environment]);
  const knex = Knex(knexConfiguration[environment]);

  server.decorate('server', 'knex', knex);
  return next();
};

attachKnex.register.attributes = {
  name: 'attachKnex',
  version: '0.0.0'
};

module.exports = attachKnex;
