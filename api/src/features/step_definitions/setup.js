const co = require('co');
const isGenerator = require('is-generator').fn;
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({setDefinitionFunctionWrapper}) {
  setDefinitionFunctionWrapper(function (fn) {
    if (!isGenerator(fn)) { return fn; }
    const generator = co.wrap(fn);
    generator.catch = fn.catch;
    return generator;
    // return co.wrap(fn);
  });
});
