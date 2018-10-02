const mockRequire = require('mock-require');
const sinon = require('sinon');

const nconfStub = {
  file: sinon.stub().returnsThis(),
  set: sinon.spy()
};

const fsStub = {
  readFile: sinon.stub().yieldsAsync(),
  stat: sinon.stub().yieldsAsync()
};

mockRequire('fs', fsStub);
mockRequire('nconf', nconfStub);

const getConfig = require('./../get_config');
process.env.NODE_ENV = 'development';

describe('getConfig', function() {
  let returnValue;

  afterEach(function() {
    sinon.resetHistory();
  });

  context('always', function() {
    beforeEach(async function() {
      await getConfig();
    });

    it('loads the environment config', function() {
      expect(nconfStub.file).to.be
        .calledWithMatch(`env/${process.env.NODE_ENV}/config.json`);
    });
  });

  context('and there are JWT keys available', function() {
    const privateKey = 'privateKey';
    const publicKey = 'publicKey';

    beforeEach(async function() {
      fsStub.readFile.withArgs('rsa-private.pem', 'utf8').yields(null, privateKey);
      fsStub.readFile.withArgs('rsa-public.pem', 'utf8').yields(null, publicKey);

      returnValue = await getConfig();
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

    it('returns the nconf object', function() {
      expect(returnValue).to.eql(nconfStub);
    });
  });

  context('and JWT keys are not available', function() {
    let configPromise;
    const missingJwtError = 'config.json';

    beforeEach(function() {
      fsStub.readFile.yields(missingJwtError);
      configPromise = getConfig();
    });

    it('throws', function() {
      return expect(configPromise).to.eventually.be
        .rejectedWith(missingJwtError);
    });
  });
});
