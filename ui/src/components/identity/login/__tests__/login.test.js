import Login from '../';
import React from 'react';
import Sinon from 'sinon';
import { InlineErrorNotification } from 'components/shared/inline_notifications';
import { PrimaryButton } from 'components/shared/buttons';

const sandbox = Sinon.createSandbox();

describe('Login', function() {
  let loginForm;

  beforeEach(function() {
    sandbox.resetHistory();
  });

  describe('rendering', function() {
    context('when there is an error', function() {
      const props = {
        error: "Where you goin' with that gun in your hand?",
        handleSubmit: () => {}
      };
      let renderedErrorMessage;

      beforeEach(function() {
        loginForm = shallow(<Login {...props} />);
        renderedErrorMessage = loginForm.find(InlineErrorNotification).prop('message');
      });

      it('renders an inline error notification', function() {
        expect(renderedErrorMessage).to.equal(props.error);
      });
    });

    context('when the field is submitting', function() {
      const props = {
        handleSubmit: () => {},
        submitting: true
      };
      let isButtonDisabled;

      beforeEach(function() {
        loginForm = shallow(<Login {...props} />);
        isButtonDisabled = loginForm.find(PrimaryButton).prop('disabled');
      });

      it('disables the submit button', function() {
        expect(isButtonDisabled).to.be.true;
      });
    });
  });
});
