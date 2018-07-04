const requestUtils = require('../request');
const jwt = require('jsonwebtoken');

const mockTokenPayload = {
  joke: 'A witticism, a gag, a bon mot, a fluctuation of words concluding' +
    'with a trick-Shut up Data.'
};

const mockRequest = {
  headers: {
    authorization: `Bearer ${jwt.sign(
      mockTokenPayload,
      'secret',
      {noTimestamp: true}
    )}`
  }
};

describe('requestUtils', function() {
  describe('getTokenFromRequest', function() {
    it('returns the decoded token from the provided request', function() {
      expect(requestUtils.getTokenFromRequest(mockRequest)).to.eql(mockTokenPayload);
    });
  });
});
