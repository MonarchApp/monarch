const mockRequire = require('mock-require');
const rootRequire = require('app-root-path').require;
const sinon = require('sinon');
const knexConfig = rootRequire('knexfile');

const knexStubValue = 'knex';
const knexStub = sinon.stub();

knexStub.returns(knexStubValue);
mockRequire('knex', knexStub);

knexConfig.testEnvironment = 'Damn it, Jim';
knexConfig.develop = "I'm a doctor, not a damn, unit test writer!";

const attachKnexRegister = require('./../attach_knex').register;

describe('Register Attach Knex', function() {
  let nextSpy;
  let serverStub;

  beforeEach(function() {
    nextSpy = sinon.spy();
    serverStub = {decorate: sinon.spy()};
    process.env.NODE_ENV = 'testEnvironment';
    attachKnexRegister(serverStub, null, nextSpy);
  });

  it('should load the knex configuration with the specified environment', function() {
    expect(knexStub).to.have.been.calledWith(knexConfig.testEnvironment);
  });

  it('should decorate the request with knex', function() {
    expect(serverStub.decorate).to.have.been
      .calledWith('request', 'knex', knexStubValue);
  });

  it('should decorate the server with knex', function() {
    expect(serverStub.decorate).to.have.been
      .calledWith('server', 'knex', knexStubValue);
  });

  it('should call the provided next value', function() {
    expect(nextSpy).to.have.been.calledAfter(serverStub.decorate);
  });
});
