const rootRequire = require('app-root-path').require;

const {expect, mockRequire, sinon} = rootRequire('src/utils/test-utilities');
const knexConfig = rootRequire('knexfile');

const knexStubValue = 'knex';
const knexStub = sinon.stub();

knexStub.returns(knexStubValue);
mockRequire('knex', knexStub);

knexConfig.testEnvironment = 'Damn it, Jim';
knexConfig.development = "I'm a doctor, not a damn, unit test writer!";

const attachKnexRegister = require('./../attach-knex').register;

describe('Register Attach Knex', function() {
  let nextSpy;
  let serverStub;

  beforeEach(function() {
    nextSpy = sinon.spy();
    serverStub = {decorate: sinon.spy()};
  });

  context('always', function() {
    beforeEach(function() {
      attachKnexRegister(serverStub, null, nextSpy);
    });

    it('should call the provided next value', function() {
      expect(nextSpy).to.have.been.calledAfter(serverStub.decorate);
    });

    it('should decorate the request with knex', function() {
      expect(serverStub.decorate).to.have.been
        .calledWith('request', 'knex', knexStubValue);
    });

    it('should decorate the server with knex', function() {
      expect(serverStub.decorate).to.have.been
        .calledWith('server', 'knex', knexStubValue);
    });
  });

  context('when the environment is specified', function() {
    beforeEach(function() {
      process.env.NODE_ENV = 'testEnvironment';
      attachKnexRegister(serverStub, null, nextSpy);
    });

    it('should load the knex configuration with the environment specified', function() {
      expect(knexStub).to.have.been.calledWith(knexConfig.testEnvironment);
    });
  });

  context('when the environment is not specified', function() {
    beforeEach(function() {
      process.env.NODE_ENV = '';
      attachKnexRegister(serverStub, null, nextSpy);
    });

    it('should load the knex configuration with the default environment', function() {
      expect(knexStub).to.have.been.calledWith(knexConfig.development);
    });
  });
});
