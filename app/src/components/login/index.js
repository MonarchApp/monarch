import Classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import withField from 'hocs/with_field';
import {Field} from 'redux-form/immutable';

const InputField = withField('input');

const ErrorHeadline = ({message}) =>
  <div className='error'>{message}</div>;

ErrorHeadline.propTypes = {
  message: PropTypes.string.isRequired
};

const Login = ({error, handleSubmit, submitting}) =>
  <form onSubmit={handleSubmit}>
    {error && <ErrorHeadline message={error} />}
    <Field component={InputField} label='Email' name='email' type='input' />
    <Field component={InputField} label='Password' name='password' type='password' />
    <button className={Classnames('submit', {submitting})} disabled={submitting} type='submit'>
      Login
    </button>
  </form>;

Login.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

export default Login;
