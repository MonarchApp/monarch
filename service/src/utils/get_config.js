const Promise = require('bluebird');
const fs = require('fs');
const nconf = require('nconf');
const path = require ('path');

const readFile = Promise.promisify(fs.readFile);


const getConfig = async () => {
  const configPath = path.resolve('env', process.env.NODE_ENV, 'config.json');

  nconf.file(configPath);
  nconf.set('auth:jwtPrivateKey', await readFile('rsa-private.pem', 'utf8'));
  nconf.set('auth:jwtPublicKey', await readFile('rsa-public.pem', 'utf8'));

  return nconf;
};

module.exports = getConfig;
