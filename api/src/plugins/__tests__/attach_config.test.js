const rootRequire = require('app-root-path').require;

const {expect, mockRequire, sinon} = rootRequire('src/utils/test_utilities');

const nconfStub = {};
nconfStub.argv = sinon.stub().returns(nconfStub);
nconfStub.env = sinon.stub().returns(nconfStub);
nconfStub.file = sinon.stub().returns(nconfStub);
mockRequire('nconf', nconfStub);

const attachConfigRegister = require('./../attach_config').register;

describe('Register Attach Config', function() {
  let nextSpy;
  let serverStub;

  beforeEach(function() {
    nextSpy = sinon.spy();
    serverStub = {decorate: sinon.spy()};
  });

  context('when the provided environment has a corresponding config file', function() {
    beforeEach(async function() {
      try {
        process.env.NODE_ENV = 'develop';
        await attachConfigRegister(serverStub, null, nextSpy);
      } catch (err) {
        throw err;
      }
    });

    it('should load command line arguments first', function() {
      expect(nconfStub.argv).to.have.been.called;
    });

    it('should load environment variables second', function() {
      expect(nconfStub.env).to.have.been.calledAfter(nconfStub.argv);
    });

    it('should load the environment config file third', function() {
      expect(nconfStub.env).to.have.been.calledAfter(nconfStub.env);
    });

    it('should decorate the request object with the nconf instance', function() {
      expect(serverStub.decorate).to.have.been.calledWith('request', 'config', nconfStub);
    });

    it('should decorate the server object with the nconf instance', function() {
      expect(serverStub.decorate).to.have.been.calledWith('server', 'config', nconfStub);
    });

    it('should call the provided next value', function() {
      expect(nextSpy).to.have.been.calledAfter(serverStub.decorate);
    });
  });

  context('when the provided environment does not have a corresponding config file', function() {
    let attachConfigRegisterPromise;

    before(function() {
      process.env.NODE_ENV = "This file has lost it's way..";
      attachConfigRegisterPromise = attachConfigRegister(serverStub, null, nextSpy);
    });

    it('should throw', function() {
      expect(attachConfigRegisterPromise).to.eventually.throw('No config file available');
    });
  });
});
