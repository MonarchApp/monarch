const Promise = require('bluebird');
const fs = require('fs');
const nconf = require('nconf');
const path = require ('path');

const readFile = Promise.promisify(fs.readFile);
const stat = Promise.promisify(fs.stat);

const attachConfig = {};

attachConfig.register = async (server, options, next) => {
  const configPath = path.resolve('config', `${process.env.NODE_ENV}.json`);

  try {
    await stat(configPath);
  } catch (error) {
    server.log(['error', 'config'], `Failed to load configuration with path: ${configPath}`);
    throw error;
  }

  nconf
    .argv()
    .env()
    .file(configPath);

  try {
    nconf.set('auth:jwtPrivateKey', await readFile('rsa-private.pem', 'utf8'));
    nconf.set('auth:jwtPublicKey', await readFile('rsa-public.pem', 'utf8'));
  } catch (error) {
    server.log(['error', 'config'], 'The private or public JWT key is missing.');
    throw error;
  }

  server.decorate('request', 'config', nconf);
  server.decorate('server', 'config', nconf);
  next();
};

attachConfig.register.attributes = {
  name: 'config',
  version: '0.0.0'
};

module.exports = attachConfig;
