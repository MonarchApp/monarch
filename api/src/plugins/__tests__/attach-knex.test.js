const {expect, proxyquire, sinon} = require('./../../utils/test-utilities');
const knexConfigPath = './../../../knexfile.js';
let Knex = require('knex');
const attachKnexRegister = require('./../attach-knex').register;

const knexStubValue = 'knex';
const knexConfigStub = proxyquire(knexConfigPath, {
  testEnvironment: 'Damn it, Jim',
  development: "I'm a doctor, not a damn, unit test writer!"
});

describe('Register Attach Knex', function() {
  let knexStub;
  let nextSpy;
  let serverStub;

  beforeEach(function() {
    knexStub = sinon.stub(Knex).returns(knexStubValue);
    // knexStub = 'shit';
    nextSpy = sinon.spy();
    serverStub = {
      decorate: sinon.spy()
    };
  });

  context('always', function() {
    beforeEach(function() {
      attachKnexRegister(serverStub, null, nextSpy);
    });

    it('should call the provided next value', function() {
      expect(nextSpy).to.have.been.calledAfter(serverStub.decorate);
    });

    it('should decorate the server value with the knex instance', function() {
      expect(serverStub.decorate).to.have.been.calledWith('server', 'knex', knexStubValue);
    });
  });

  context('when the environment is specified', function() {
    beforeEach(function() {
      process.env.NODE_ENV = 'testEnvironment';
      attachKnexRegister(serverStub, null, nextSpy);
    });

    it('should load the knex configuration with the environment specified', function() {
      expect(knexStub).to.have.been.calledWith(knexConfigStub.testEnvironment);
    });
  });

  context('when the environment is not specified', function() {
    beforeEach(function() {
      process.env.NODE_ENV = '';
      attachKnexRegister(serverStub, null, nextSpy);
    });

    it('should load the knex configuration with the environment specified', function() {
      expect(knexStub).to.have.been.calledWith(knexConfigStub.develop);
    });
  });
});
