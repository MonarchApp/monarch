const Co = require('co');
const isGenerator = require('is-generator').fn;
const {defineSupportCode} = require('cucumber');

defineSupportCode(function({setDefinitionFunctionWrapper}) {
  setDefinitionFunctionWrapper(function (fn) {
    if (!isGenerator(fn)) { return fn; }
    return Co.wrap(fn);
  });
});
