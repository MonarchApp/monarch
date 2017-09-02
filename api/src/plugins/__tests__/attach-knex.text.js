const Knex = require('knex');
const {expect, sinon} = require('./../utils/test-utilities');
const knexConfig = require('./../../../knexfile.js');

const knexValue = 'knex'
const knexStub = sinon.stub().returns knexValue

describe('Attach Knex', function() {
  before(function() {
    require('./../attach-knex');
  });

  it('should pass the server options into the server', function() {
    expect(connectionSpy).to.have.been.calledWith(localConfig);
  });

  it('should start the server', function() {
    expect(startSpy).to.have.been.calledWith(sinon.match.func);
  });
});
