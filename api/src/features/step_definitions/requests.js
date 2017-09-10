const request = require('co-request');
const {defineSupportCode} = require('cucumber');
const {expect} = require('chai');

defineSupportCode(function({When, Then}) {
  When(/^GET "([^"]*)"$/, function*(requestPath) {
    const url = `${this.apiUrl}${requestPath}`;
    const method = 'GET';

    try {
      this.activeRequest = yield request({method, url});
    } catch (error) {
      error.message = `Failed to ${method} to ${url}.\n\n${error.message}`;
      throw error;
    }
  });

  When(/^(POST|PUT) "([^"]*)"$/, function*(method, requestPath, json) {
    const url = `${this.apiUrl}${requestPath}`;

    try {
      this.activeRequest = yield request({json, method, url});
    } catch (error) {
      error.message = `Failed to ${method} to ${url}.\n\n${error.message}`;
      throw error;
    }
  });

  Then('response status code is {int}', function(statusCode) {
    expect(this.activeRequest.statusCode).to.equal(statusCode);
  });

  Then('response body is', function(json) {
    let body;

    try {
      body = JSON.parse(json);
    } catch (error) {
      error.message = `Failed to parse JSON:\n\n${json} \
        \n\nError:\n${error.message}`;
      throw error;
    }

    expect(body).to.eql(this.activeRequest.body);
  });
});
