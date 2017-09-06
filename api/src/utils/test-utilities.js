const rootRequire = require('app-root-path').require;
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const mockRequire = require('mock-require');
chai.use(sinonChai);

const {expect} = chai;

const knexConn = require('knex')(rootRequire('knexfile')['test']);

module.exports = {expect, knexConn, mockRequire, sinon};
