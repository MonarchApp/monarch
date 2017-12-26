const Promise = require('bluebird');
const fs = require('fs');
const nconf = require('nconf');
const path = require ('path');
const rootRequire = require('app-root-path').require;
const {throwWithMessage} = rootRequire('src/utils/throw');

const stat = Promise.promisify(fs.stat);
const readFile = Promise.promisify(fs.readFile);

const attachConfig = {};

attachConfig.register = async (server, options, next) => {
  const configPath = path.resolve('config', `${process.env.NODE_ENV}.json`);

  try {
    await stat(configPath);
  } catch (error) {
    throwWithMessage(`No config file available at "${configPath}".`);
  }

  nconf
    .argv()
    .env()
    .file(configPath);

  try {
    nconf.set('auth:jwtPrivateKey', await readFile('rsa-private.pem'));
    nconf.set('auth:jwtPublicKey', await readFile('rsa-public.pem'));
  } catch (error) {
    throwWithMessage(error, 'Unable to get retrieve JWT private and/or public keys.');
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
