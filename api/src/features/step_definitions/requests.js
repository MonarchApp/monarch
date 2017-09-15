const Request = require('co-request');
const {defineSupportCode} = require('cucumber');
const {expect} = require('chai');
const MatchPattern = require('lodash-match-pattern');

const parseJson = json => {
  try {
    return JSON.parse(json);
  } catch (error) {
    error.message = `Failed to parse JSON:\n\n${json} \
      \n\nError:\n${error.message}`;
    throw error;
  }
};

defineSupportCode(function({When, Then}) {
  When(/^(DELETE|GET) "([^"]*)"$/, function*(method, requestPath) {
    const url = this.getRequestUrl(requestPath);

    try {
      this.activeRequest = yield Request({method, url});
    } catch (error) {
      error.message = `Failed to ${method} ${url}.\n\n${error.message}`;
      throw error;
    }
  });

  When(/^(POST|PUT) "([^"]*)"$/, function*(method, requestPath, json) {
    const url = this.getRequestUrl(requestPath);
    const body = parseJson(json);

    try {
      this.activeRequest = yield Request({body, json: true, method, url});
    } catch (error) {
      error.message = `Failed to ${method} to ${url}.\n\n${error.message}`;
      throw error;
    }
  });

  Then('response status code is {int}', function(statusCode) {
    expect(this.activeRequest.statusCode).to.equal(statusCode);
  });

  Then('response body is', function(json) {
    expect(parseJson(json)).to.eql(this.activeRequest.body);
  });

  Then('response body matches', function(json) {
    const bodyMatchesPattern = MatchPattern(this.activeRequest.body, json);
    if (bodyMatchesPattern) { throw new Error(bodyMatchesPattern); }
  });
});
