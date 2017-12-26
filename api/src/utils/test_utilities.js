const _ = require('lodash');
const rootRequire = require('app-root-path').require;

const getJoiStubFunctionArgs = args => {
  if (args === []) return '()';
  return `(${args.join(', ')})`;
};

const testUtils = {};

testUtils.getKnexConnection = () => require('knex')(rootRequire('knexfile')['test']);

testUtils.getJoiStub = methods => {
  return methods.reduce((stub, methodName) => {
    stub[methodName] = function(...args) {
      const functionArgs = getJoiStubFunctionArgs(args);
      this.validationString += methodName + functionArgs;
      return this;
    };
    return stub;
  }, {});
};

testUtils.validateJoiStub = (joiStub, methods) => {
  methods.forEach((method) => {
    let methodName = method;
    let args = [];

    if (_.isArray(method)) [methodName, ...args] = method;

    const functionArgs = getJoiStubFunctionArgs(args);
    expect(joiStub.validationString).to.contain(methodName + functionArgs);
  });
};


module.exports = testUtils;
