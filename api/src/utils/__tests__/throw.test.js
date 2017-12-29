const throwUtils = require('../throw');

describe('Throw Utils', function() {
  describe('throwWithMessage', function() {
    const errorMessage = 'Danger, Will Robinson! Danger!';
    const message = 'I am afraid I goofed.';
    let callThrowWithMessage;

    before(function() {
      callThrowWithMessage = () => {
        try {
          throw new Error(errorMessage);
        } catch (error) {
          throwUtils.throwWithMessage(error, message);
        }
      };
    });

    it('should throw an error with the provided message', function() {
      expect(callThrowWithMessage).to.throw(`${message}\n\nError:\n${errorMessage}`);
    });
  });
});
