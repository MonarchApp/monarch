const {defineSupportCode} = require('cucumber');

process.env.NODE_ENV = 'test';
function MonarchWorld() {}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(MonarchWorld);
});
