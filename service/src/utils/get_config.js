const Promise = require('bluebird');
const fs = require('fs');
const nconf = require('nconf');
const path = require ('path');

const readFile = Promise.promisify(fs.readFile);
const stat = Promise.promisify(fs.stat);


const getConfig = async () => {
  const configPath = path.resolve('config', `${process.env.NODE_ENV}.json`);

  await stat(configPath);

  nconf.file(configPath);
  nconf.set('auth:jwtPrivateKey', await readFile('rsa-private.pem', 'utf8'));
  nconf.set('auth:jwtPublicKey', await readFile('rsa-public.pem', 'utf8'));

  return nconf;
};

module.exports = getConfig;
