const {defineSupportCode} = require('cucumber');

defineSupportCode(({defineParameterType}) => {
  defineParameterType({
    name: 'getOrDelete',
    regexp: /(GET|DELETE)/
  });

  defineParameterType({
    regexp: /(POST|PUT)/,
    name: 'postOrPut'
  });
});
