const {defineSupportCode} = require('cucumber');

defineSupportCode(({defineParameterType}) => {
  defineParameterType({
    name: 'getOrDelete',
    regexp: /(GET|DELETE)/
  });

  defineParameterType({
    regexp: /(PATCH|POST|PUT)/,
    name: 'patchPostOrPut'
  });

  defineParameterType({
    regexp: /(\d+)(?:st|nd|rd|th)/,
    name: 'ordinalInt'
  });
});
