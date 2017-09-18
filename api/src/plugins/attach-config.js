const Promise = require('bluebird');
const nconf = require('nconf');
const path = require ('path');
const stat = Promise.promisify(require('fs').stat);

const attachConfig = {};

attachConfig.register = async (server, options, next) => {
  const configPath = path.resolve('config', `${process.env.NODE_ENV}.json`);

  try {
    await stat(configPath);
  } catch (error) {
    error.message = `No config file available at "${configPath}".\n\nError:\n${error.message}`;
    throw error;
  }

  nconf
    .argv()
    .env()
    .file(configPath);

  server.decorate('server', 'config', nconf);
  next();
};

attachConfig.register.attributes = {
  name: 'config',
  version: '0.0.0'
};

module.exports = attachConfig;
