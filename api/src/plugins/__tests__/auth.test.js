const rootRequire = require('app-root-path').require;
const {expect, mockRequire, sinon} = require('./../../utils/test_utilities');
const registerAuth = require('./../auth').register;

describe('Register Auth', function() {
  let nextSpy;
  let serverStub;

  beforeEach(function() {
    nextSpy = sinon.spy();
    serverStub = {
      auth: {
        default: sinon.spy(),
        strategy: sinon.spy()
      }
    };
  });

  context('always', function() {
    beforeEach(function() {
      registerAuth(serverStub, null, nextSpy);
    });

    it('should set the server authentication strategy to jwt', function() {
      expect(serverStub.auth.strategy).to.have.been.calledWith('jwt', {
        key: sinon.match.string,
        verifyOptions: {algorithms: ['RS256']}
      });
    });

    it('should set the default server authentication strategy to jwt', function() {
      expect(serverStub.auth.default).to.have.been.calledWith('jwt');
    });

    it('should call the next callback', function() {
      expect(nextSpy).to.have.been.calledAfter(serverStub.auth.default);
    });
  });
});
