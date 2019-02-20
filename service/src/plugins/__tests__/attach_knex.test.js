const mockRequire = require('mock-require');
const rootRequire = require('app-root-path').require;
const sinon = require('sinon');
const knexConfig = rootRequire('knexfile');

const knexStubValue = 'knex';
const knexStub = sinon.stub();
const knexPostgisSpy = sinon.spy();

knexStub.returns(knexStubValue);
mockRequire('knex-postgis', knexPostgisSpy);
mockRequire('knex', knexStub);

knexConfig.testEnvironment =
 "Damn it, Jim! I'm a doctor, not a damn, unit test writer!";

const attachKnexRegister = require('./../attach_knex').register;

describe('Register Attach Knex', function() {
  let serverStub;

  beforeEach(async function() {
    serverStub = {decorate: sinon.spy()};
    process.env.NODE_ENV = 'testEnvironment';
    await attachKnexRegister(serverStub);
  });

  it('loads the knex configuration with the specified environment', function() {
    expect(knexStub).to.be.calledWith(knexConfig.testEnvironment);
  });

  it('initializes postgis functionality', function() {
    expect(knexPostgisSpy).to.be.calledWith(knexStubValue);
  });

  it('decorates the request with knex', function() {
    expect(serverStub.decorate).to.be
      .calledWith('request', 'knex', knexStubValue);
  });

  it('decorates the server with knex', function() {
    expect(serverStub.decorate).to.be
      .calledWith('server', 'knex', knexStubValue);
  });
});
