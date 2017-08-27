const {expect, sinon} = require('./../utils/test-utilities');
const Hapi = require('hapi');
const localConfig = require('./../../config/local.json');

// const server = require('./../server');
const connectionSpy = sinon.spy(Hapi.Server.prototype, 'connection');
const startSpy = sinon.spy(Hapi.Server.prototype, 'start');

describe('Server Init', function() {
  before(function() {
    require('./../server');
  });

  it('should pass the server options into the server', function() {
    expect(connectionSpy).to.have.been.calledWith(localConfig);
  });

  it('should start the server', function() {
    expect(startSpy).to.have.been.calledWith(sinon.match.func);
  });
});
