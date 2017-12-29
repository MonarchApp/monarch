const rootRequire = require('app-root-path').require;

const request = require('request-promise');
const {defineSupportCode} = require('cucumber');
const {throwWithMessage} = rootRequire('src/utils/throw');

const utils = {};

utils.parseJson = json => {
  try {
    return JSON.parse(json);
  } catch (error) {
    throwWithMessage(error, `Failed to parse JSON:\n\n${json}`);
  }
};

utils.request = async options => {
  const fullOptions = Object.assign({}, options, {
    resolveWithFullResponse: true,
    simple: false,
    time: true
  });

  const {method, url} = fullOptions;

  try {
    return await request(fullOptions);
  } catch (error) {
    throwWithMessage(error, `Failed to ${method} ${url}.`);
  }
};

defineSupportCode(({Before}) => {
  Before(function() {
    this.utils = utils;
    this.utils.getRequestUrl = path => `${this.server.info.uri}/v1${path}`;
  });
});
