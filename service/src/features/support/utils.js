const request = require('request-promise');
const {defineSupportCode} = require('cucumber');

const utils = {};

utils.parseJson = json => {
  try {
    return JSON.parse(json);
  } catch (error) {
    utils.consoleError(`Failed to parse JSON:\n\n${json}`);
    throw error;
  }
};

utils.request = async (options, token) => {
  let tokenOptions = {};

  if (token) tokenOptions = {headers: {authorization: `Bearer ${token}`}};

  const fullOptions = Object.assign({}, {
    json: true,
    resolveWithFullResponse: true,
    simple: false,
    time: true
  }, options, tokenOptions);

  const {method, url} = fullOptions;

  try {
    return await request(fullOptions);
  } catch (error) {
    utils.consoleError(`Failed to ${method} ${url}.`);
    throw error;
  }
};

// eslint-disable-next-line no-console
utils.consoleError = (...args) => console.error(...args);

defineSupportCode(({Before}) => {
  Before(function() {
    this.utils = utils;
    this.utils.getRequestUrl = path => `${this.server.info.uri}/v1${path}`;
  });
});
