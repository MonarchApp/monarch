const mockRequire = require('mock-require');
const sinon = require('sinon');

const hapiAuthJwt2Stub = {value: 'The plugin is alive, Jim.'};
mockRequire('hapi-auth-jwt2', hapiAuthJwt2Stub);

const registerAuth = require('./../auth').register;

describe('Register Auth', function() {
  const jwtPublicKey = 'Be vewwwy vewwwwwy quieeeet';
  let nextSpy;
  let serverStub;

  beforeEach(function() {
    nextSpy = sinon.spy();
    serverStub = {
      auth: {strategy: sinon.spy()},
      config: {
        get: sinon.stub().withArgs('auth:jwtPublicKey').returns(jwtPublicKey)
      },
      register: sinon.spy()
    };
  });

  context('when the hapi auth jwt plugin succesfully loads', function() {
    beforeEach(async function() {
      await registerAuth(serverStub, null, nextSpy);
    });

    it('should be registered with the server', function() {
      expect(serverStub.register).to.have.been.calledWith(sinon.match.same(hapiAuthJwt2Stub));
    });

    it('should set the server authentication strategy to jwt', function() {
      expect(serverStub.auth.strategy).to.have.been.calledWith('jwt', 'jwt', true, {
        key: jwtPublicKey,
        validateFunc: sinon.match.func,
        verifyOptions: {algorithms: ['RS256']}
      });
    });

    it('should call the next callback', function() {
      expect(nextSpy).to.have.been.calledAfter(serverStub.auth.strategy);
    });
  });

  context('when the server fails to register the hapi-auth-jwt2 plugin', function() {
    let registerAuthPluginPromise;

    before(function() {
      serverStub.register = () => { throw new Error(); };
      registerAuthPluginPromise = registerAuth(serverStub, null, nextSpy);
    });

    it('should throw', function() {
      expect(registerAuthPluginPromise).to.eventually.throw('Failed to load hapi-auth-jwt plugin.');
    });
  });
});
