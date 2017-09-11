const co = require('co');
const isGenerator = require('is-generator').fn;
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({setDefinitionFunctionWrapper}) {
  setDefinitionFunctionWrapper(function (fn) {
    if (!isGenerator(fn)) { return fn; }
    return co.wrap(fn);
  });
});
