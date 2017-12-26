const mockRequire = require('mock-require');
const rootRequire = require('app-root-path').require;
const {getJoiStub, validateJoiStub} = rootRequire('src/utils/test_utilities');

const joiStub = getJoiStub(['email', 'max', 'required', 'string']);

mockRequire('joi', joiStub);
const usersHandler = require('../users');

describe('usersHandler', function() {
  describe('post validation', function() {
    const {payload} = usersHandler.post.config.validate;

    it('validates the email field', function() {
      validateJoiStub(payload.email, ['string', 'email', 'required']);
    });

    it('validates the password field', function() {
      validateJoiStub(payload.password, ['string', 'required']);
    });
  });
});
