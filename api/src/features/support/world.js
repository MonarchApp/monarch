const {defineSupportCode} = require('cucumber');

function MonarchWorld() {}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(MonarchWorld);
});
