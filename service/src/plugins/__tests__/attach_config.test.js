const sinon = require('sinon');

const attachConfigRegister = require('./../attach_config').register;

describe('Register Attach Config', function() {
  const serverStub = {decorate: sinon.spy()};

  afterEach(function() {
    sinon.resetHistory();
  });

  context('and there are JWT keys available', function() {
    const config = 'config';

    beforeEach(async function() {
      await attachConfigRegister(serverStub, {config});
    });
    it('decorates the request object with the nconf instance', function() {
      expect(serverStub.decorate).to.be.calledWith('request', 'config', config);
    });

    it('decorates the server object with the nconf instance', function() {
      expect(serverStub.decorate).to.be.calledWith('server', 'config', config);
    });
  });
});
