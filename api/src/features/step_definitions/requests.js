const matchPattern = require('lodash-match-pattern');
const request = require('co-request');
const rootRequire = require('app-root-path').require;
const {defineSupportCode} = require('cucumber');
const {expect} = require('chai');
const {throwWithMessage} = rootRequire('src/utils/throw');

const parseJson = json => {
  try {
    return JSON.parse(json);
  } catch (error) {
    error.message = `Failed to parse JSON:\n\n${json} \
      \n\nError:\n${error.message}`;
    throw error;
  }
};

const makeRequest = async function() {
  const options = Object.assign({}, arguments[0], {time: true});
  const {method, url} = options;

  try {
    return await request(options);
  } catch (error) {
    throwWithMessage(error, `Failed to ${method} ${url}.`);
  }
};

defineSupportCode(function({When, Then}) {
  When(/^(DELETE|GET) "([^"]*)"$/, async function(method, requestPath) {
    const url = this.getRequestUrl(requestPath);

    this.activeRequest = await makeRequest({method, url});
  });

  When(/^(POST|PUT) "([^"]*)"$/, async function(method, requestPath, json) {
    const url = this.getRequestUrl(requestPath);
    const body = parseJson(json);

    this.activeRequest = await makeRequest({body, json: true, method, url});
  });

  Then('response status code is {int}', function(statusCode) {
    expect(this.activeRequest.statusCode).to.equal(statusCode);
  });

  Then('response body is empty', function() {
    expect(this.activeRequest.body).to.be.undefined;
  });

  Then('response body matches', function(json) {
    const bodyMatchesPattern = matchPattern(this.activeRequest.body, json);
    if (bodyMatchesPattern) { throw new Error(bodyMatchesPattern); }
  });
});
