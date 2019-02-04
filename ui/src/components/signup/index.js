import FullLogo from 'icons/full_logo';
import PropTypes from 'prop-types';
import React from 'react';
import withField from 'hocs/with_field';
import {Field} from 'redux-form';
import {PrimaryButton} from 'components/buttons';
import {InlineErrorNotification} from 'components/inline_notifications';

const InputField = withField('input');

const Steps = [
  <Field
    component={InputField}
    label='Email'
    name='email'
    type='email' />,
  <Field
    component={InputField}
    label='Username'
    name='username'
    type='text' />,
  <Field
    component={InputField}
    label='Password'
    name='password'
    type='password' />
];

function getStepButtonLabel(currentIndex) {
  if (currentIndex == Steps.length - 1) {
    return "Submit";
  }
  return "Next";
}

const Signup = ({error, handleSubmit, step, submitting}) =>
  <div className='signup-form-wrapper'>
    <FullLogo />
    <form className='signup-form' noValidate onSubmit={handleSubmit}>
      {error && <InlineErrorNotification message={error} />}
      {Steps[step]}
      <PrimaryButton
        disabled={submitting}
        text={getStepButtonLabel(step)}
        type='submit'/>
    </form>
  </div>;

Signup.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  step: PropTypes.number,
  submitting: PropTypes.bool
};

export default Signup;
