const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const {expect} = chai;

const chaiUse = sinon.spy(chai, 'use');

describe('Test Utilities', function() {
  let result;

  before(function() {
    result = require('./../test-utilities');
  });

  it('should set up the sinon chai library with chai', function() {
    expect(chaiUse).to.have.been.calledWith(sinonChai);
  });

  it('should return sinon and expect for test consumption', function() {
    expect(result).to.eql({expect, sinon});
  });
});
