const matchPattern = require('lodash-match-pattern');
const request = require('co-request');
const {defineSupportCode} = require('cucumber');
const {expect} = require('chai');

defineSupportCode(function({When, Then}) {
  When(/^(DELETE|GET) "([^"]*)"$/, async function(method, requestPath) {
    const url = this.getRequestUrl(requestPath);

    try {
      this.activeRequest = await request({method, url});
    } catch (error) {
      error.message = `Failed to ${method} ${url}.\n\n${error.message}`;
      throw error;
    }
  });

  When(/^(POST|PUT) "([^"]*)"$/, async function(method, requestPath, json) {
    const url = this.getRequestUrl(requestPath);
    const body = this.parseJson(json);

    try {
      this.activeRequest = await request({body, json: true, method, url});
    } catch (error) {
      error.message = `Failed to ${method} to ${url}.\n\n${error.message}`;
      throw error;
    }
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
