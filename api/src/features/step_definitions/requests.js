const matchPattern = require('lodash-match-pattern');
const {defineSupportCode} = require('cucumber');
const {expect} = require('chai');

defineSupportCode(function({When, Then}) {
  When('{getOrDelete} {string}', async function(method, requestPath) {
    const url = this.utils.getRequestUrl(requestPath);

    this.activeRequest = await this.utils.request({method, url}, this.token);
  });

  When('{postOrPut} {string}', async function(method, requestPath, json) {
    const url = this.utils.getRequestUrl(requestPath);
    const body = this.utils.parseJson(json);

    this.activeRequest = await this.utils.request({body, json: true, method, url}, this.token);
  });

  When('response body is parsed as json', function() {
    this.activeRequest.body = this.utils.parseJson(this.activeRequest.body);
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

  Then('response is delayed', function() {
    expect(this.activeRequest.timingPhases.total).to.be.above(500);
  });
});
