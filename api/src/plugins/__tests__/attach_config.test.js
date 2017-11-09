const mockRequire = require('mock-require');
const sinon = require('sinon');

const nconfStub = {};
nconfStub.argv = sinon.stub().returns(nconfStub);
nconfStub.env = sinon.stub().returns(nconfStub);
nconfStub.file = sinon.stub().returns(nconfStub);
nconfStub.set = sinon.spy();

const fsStub = {
  readFile: sinon.stub().yieldsAsync(),
  stat: sinon.stub().yieldsAsync()
};

mockRequire('fs', fsStub);
mockRequire('nconf', nconfStub);

const attachConfigRegister = require('./../attach_config').register;
process.env.NODE_ENV = 'develop';

describe('Register Attach Config', function() {
  let nextSpy;
  let serverStub;

  beforeEach(function() {
    nextSpy = sinon.spy();
    serverStub = {decorate: sinon.spy()};
  });

  context('when the provided environment has a corresponding config file', function() {
    context('always', function() {
      beforeEach(async function() {
        await attachConfigRegister(serverStub, null, nextSpy);
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
    });

    context('and there are JWT keys available', function() {
      const privateKey = 'privateKey';
      const publicKey = 'publicKey';

      beforeEach(async function() {
        fsStub.readFile.withArgs('rsa-private.pem').yields(null, privateKey);
        fsStub.readFile.withArgs('rsa-public.pem').yields(null, publicKey);

        await attachConfigRegister(serverStub, null, nextSpy);
      });

      it('should set the private key on the nconf object', function() {
        expect(nconfStub.set).to.have.been.calledWith('auth:jwtPrivateKey', privateKey);
      });

      it('should set the public key on the nconf object', function() {
        expect(nconfStub.set).to.have.been.calledWith('auth:jwtPublicKey', publicKey);
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

    context('and JWT keys are not available', function() {
      let configPromise;

      beforeEach(function() {
        fsStub.readFile.yieldsAsync('THESE ARE NOT THE JWT SECRETZ UR LOKIN FOR');
        configPromise = attachConfigRegister(serverStub, null, nextSpy);
      });

      it('should throw', function() {
        expect(configPromise).to.eventually
          .throw('Unable able to retrieve JWT private and/or public keys.');
      });
    });
  });

  context('when the provided environment does not have a corresponding config file', function() {
    let configPromise;

    beforeEach(function() {
      fsStub.stat.yieldsAsync("This file has lost it's way..");
      configPromise = attachConfigRegister(serverStub, null, nextSpy);
    });

    it('should throw', function() {
      expect(configPromise).to.have.eventually.throw('No config file available');
    });
  });
});
