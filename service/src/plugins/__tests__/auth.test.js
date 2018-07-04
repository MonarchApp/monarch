const mockRequire = require('mock-require');
const sinon = require('sinon');

const hapiAuthJwt2Stub = {value: 'The plugin is alive, Jim.'};
mockRequire('hapi-auth-jwt2', hapiAuthJwt2Stub);

const registerAuth = require('./../auth').register;

describe('Register Auth', function() {
  const jwtPublicKey = 'Be vewwwy vewwwwwy quieeeet';
  const nextSpy = sinon.spy();
  const serverStub = {
    auth: {strategy: sinon.spy()},
    config: {
      get: sinon.stub().withArgs('auth:jwtPublicKey').returns(jwtPublicKey)
    },
    register: sinon.spy()
  };

  afterEach(function() {
    sinon.resetHistory();
  });

  context('when the hapi auth jwt plugin succesfully loads', function() {
    beforeEach(async function() {
      await registerAuth(serverStub, null, nextSpy);
    });

    it('register with the server', function() {
      expect(serverStub.register).to.be.calledWith(sinon.match.same(hapiAuthJwt2Stub));
    });

    it('sets the server authentication strategy to jwt', function() {
      expect(serverStub.auth.strategy).to.be.calledWith('jwt', 'jwt', true, {
        key: jwtPublicKey,
        validateFunc: sinon.match.func,
        verifyOptions: {algorithms: ['RS256']}
      });
    });

    it('calls the next callback', function() {
      expect(nextSpy).to.be.calledAfter(serverStub.auth.strategy);
    });
  });

  context('when the server fails to register the hapi-auth-jwt2 plugin', function() {
    let registerAuthPluginPromise;

    beforeEach(function() {
      serverStub.register = () => { throw new Error(); };
      registerAuthPluginPromise = registerAuth(serverStub, null, nextSpy);
    });

    it('throws', function() {
      return expect(registerAuthPluginPromise).to.be.eventually
        .rejectedWith('Failed to load hapi-auth-jwt plugin.');
    });
  });
});
