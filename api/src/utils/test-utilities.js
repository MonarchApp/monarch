'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const mockRequire = require('mock-require');
chai.use(sinonChai);

const {expect} = chai;

module.exports = {expect, mockRequire, sinon};
