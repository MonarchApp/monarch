const mockRequire = require('mock-require');
const sinon = require('sinon');

const nconfStub = {
  argv: sinon.stub().returnsThis(),
  env: sinon.stub().returnsThis(),
  file: sinon.stub().returnsThis(),
  set: sinon.spy()
};

const fsStub = {
  readFile: sinon.stub().yieldsAsync(),
  stat: sinon.stub().yieldsAsync()
};

mockRequire('fs', fsStub);
mockRequire('nconf', nconfStub);

const attachConfigRegister = require('./../attach_config').register;
process.env.NODE_ENV = 'develop';

const sandbox = sinon.createSandbox();

describe('Register Attach Config', function() {
  const nextSpy = sandbox.spy();
  const serverStub = {
    decorate: sandbox.spy(),
    log: () => {}
  };

  afterEach(function() {
    sandbox.reset();
  });

  context('when the provided environment has a corresponding config file', function() {
    context('always', function() {
      beforeEach(async function() {
        await attachConfigRegister(serverStub, null, nextSpy);
      });

      it('loads command line arguments first', function() {
        expect(nconfStub.argv).to.be.called;
      });

      it('loads environment variables second', function() {
        expect(nconfStub.env).to.be.calledAfter(nconfStub.argv);
      });

      it('loads the environment config file third', function() {
        expect(nconfStub.file).to.be.calledAfter(nconfStub.env);
      });
    });

    context('and there are JWT keys available', function() {
      const privateKey = 'privateKey';
      const publicKey = 'publicKey';

      beforeEach(async function() {
        fsStub.readFile.withArgs('rsa-private.pem', 'utf8').yields(null, privateKey);
        fsStub.readFile.withArgs('rsa-public.pem', 'utf8').yields(null, publicKey);

        await attachConfigRegister(serverStub, null, nextSpy);
      });

      after(function() {
        fsStub.readFile.reset();
      });

      it('sets the private key on the nconf object', function() {
        expect(nconfStub.set).to.be.calledWith('auth:jwtPrivateKey', privateKey);
      });

      it('sets the public key on the nconf object', function() {
        expect(nconfStub.set).to.be.calledWith('auth:jwtPublicKey', publicKey);
      });

      it('decorates the request object with the nconf instance', function() {
        expect(serverStub.decorate).to.be.calledWith('request', 'config', nconfStub);
      });

      it('decorates the server object with the nconf instance', function() {
        expect(serverStub.decorate).to.be.calledWith('server', 'config', nconfStub);
      });

      it('calls the provided next value', function() {
        expect(nextSpy).to.be.calledAfter(serverStub.decorate);
      });
    });

    context('and JWT keys are not available', function() {
      let configPromise;
      const missingJwtError = 'THESE ARE NOT THE JWT SECRETZ UR LOKIN FOR';

      beforeEach(function() {
        fsStub.readFile.yields(missingJwtError);
        configPromise = attachConfigRegister(serverStub, null, nextSpy);
      });

      it('throws', function() {
        return expect(configPromise).to.eventually.be
          .rejectedWith(missingJwtError);
      });
    });
  });

  context('when the provided environment does not have a corresponding config file',
    function() {
      let configPromise;
      const missingFileError = "This file has lost it's way..";

      beforeEach(function() {
        fsStub.stat.yieldsAsync(missingFileError);
        configPromise = attachConfigRegister(serverStub, null, nextSpy);
      });

      it('throws', function() {
        return expect(configPromise).to.eventually.be
          .rejectedWith(missingFileError);
      });
    });
});
