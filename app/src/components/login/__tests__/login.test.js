import Login from '../';
import React from 'react';
import Sinon from 'sinon';

const sandbox = Sinon.createSandbox();

describe('Login', function() {
  let loginForm;

  beforeEach(function() {
    sandbox.resetHistory();
  });

  describe('rendering', function() {
    context('when the form is submitting', function() {
      const props = {
        handleSubmit: () => {},
        submitting: true
      };
      let submitButton;

      beforeEach(function() {
        loginForm = shallow(<Login {...props} />);
        submitButton = loginForm.find('button[type="submit"]');
      });

      it('disables the submit button', function() {
        expect(submitButton.prop('disabled')).to.be.true;
      });

      it('styles the button', function() {
        expect(submitButton.hasClass('submitting')).to.be.true;
      });
    });
  });
});
