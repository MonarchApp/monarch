const matchPattern = require('lodash-match-pattern');
const {defineSupportCode} = require('cucumber');
const {expect} = require('chai');

const err = ({body}, message = '') => `${message}\n\nResponse:\n${JSON.stringify(body, null, 2)}`;

defineSupportCode(function({When, Then}) {
  When('{getOrDelete} {string}', async function(method, requestPath) {
    const url = this.utils.getRequestUrl(requestPath);

    this.activeRequest = await this.utils.request({method, url}, this.token);
  });

  When('{patchPostOrPut} {string}', async function(method, requestPath, json) {
    const url = this.utils.getRequestUrl(requestPath);
    const body = this.utils.parseJson(json);

    this.activeRequest = await this.utils.request({body, method, url}, this.token);
  });

  Then('response status code is {int}', function(expectedStatusCode) {
    const {statusCode} = this.activeRequest;
    const error = err(this.activeRequest);

    expect(statusCode, error).to.equal(expectedStatusCode);
  });

  Then('response body is empty', function() {
    const error = err(this.activeRequest);

    expect(this.activeRequest.body, error).to.be.empty;
  });

  Then('response body is undefined', function() {
    const error = err(this.activeRequest);

    expect(this.activeRequest.body, error).to.be.undefined;
  });

  Then('response body matches', function(json) {
    const bodyMatchesPattern = matchPattern(this.activeRequest.body, json);
    if (bodyMatchesPattern) { throw new Error(bodyMatchesPattern); }
  });

  Then('response is delayed', function() {
    const totalRequestTime = this.activeRequest.timingPhases.total;
    const error = err(this.activeRequest, `Response took ${totalRequestTime} ms.`);

    expect(totalRequestTime, error).to.be.above(500);
  });
});
