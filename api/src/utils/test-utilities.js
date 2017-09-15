const rootRequire = require('app-root-path').require;
const Chai = require('chai');
const Sinon = require('sinon');
const SinonChai = require('sinon-chai');
const MockRequire = require('mock-require');
Chai.use(SinonChai);

const {expect} = Chai;

const knexConn = require('knex')(rootRequire('knexfile')['test']);

module.exports = {expect, knexConn, MockRequire, Sinon};
