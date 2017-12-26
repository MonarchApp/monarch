const mockRequire = require('mock-require');
const rootRequire = require('app-root-path').require;
const {getJoiStub, validateJoiStub} = rootRequire('src/utils/test_utilities');

const joiStub = getJoiStub(['email', 'max', 'required', 'string']);

mockRequire('joi', joiStub);
const {payload} = require('../auth').login.config.validate;

describe('authHandler', function() {
  describe('login validation', function() {
    it('validates the email field', function() {
      validateJoiStub(payload.email, ['string', 'email', 'required']);
    });

    it('validates the password field', function() {
      validateJoiStub(payload.password, [
        'string',
        ['max', 72],
        'required'
      ]);
    });
  });
});
