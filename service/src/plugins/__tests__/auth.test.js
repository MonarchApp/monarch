const mock = require('mock-require');
const sinon = require('sinon');

const hapiAuthJwtStub = {value: 'The plugin is alive, Jim.'};
mock('hapi-auth-jwt2', hapiAuthJwtStub);

const registerAuth = require('./../auth').register;

describe('Register Auth', function() {
  const jwtPublicKey = 'Be vewwwy vewwwwwy quieeeet';
  const serverStub = {
    auth: {
      default: sinon.spy(),
      strategy: sinon.spy()
    },
    register: sinon.stub(),
    log: () => {}
  };

  afterEach(function() {
    sinon.resetHistory();
  });

  after(function() {
    mock.stopAll();
  });

  context('when the hapi auth jwt plugin successfully loads', function() {
    beforeEach(async function() {
      await registerAuth(serverStub, {jwtPublicKey});
    });

    it('register with the server', function() {
      expect(serverStub.register).to.be.calledWith(sinon.match.same(hapiAuthJwtStub));
    });

    it('sets the server authentication strategy to jwt', function() {
      expect(serverStub.auth.strategy).to.be.calledWith('jwt', 'jwt', {
        key: jwtPublicKey,
        validate: sinon.match.func,
        verifyOptions: {algorithms: ['RS256']}
      });
    });

    it('sets the default server authentication strategy to jwt', function() {
      expect(serverStub.auth.default).to.be.calledWith('jwt');
    });
  });

  context('when the server fails to register the hapi-auth-jwt2 plugin', function() {
    let registerAuthPluginPromise;

    beforeEach(function() {
      serverStub.register.rejects();
      registerAuthPluginPromise = registerAuth(serverStub, {jwtPublicKey});
    });

    it('throws', function() {
      return expect(registerAuthPluginPromise).to.be.eventually.rejected;
    });
  });
});
