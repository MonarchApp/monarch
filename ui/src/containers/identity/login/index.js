import './login.scss';
import * as recompose from 'recompose';
import IdentityActions from './actions';
import Login from 'components/identity/login';
import React from 'react';
import RoutePaths from 'constants/route_paths.js';
import validate from './validate';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit, SubmissionError } from 'redux-form';

const FORM_NAME = 'login';

export default recompose.compose(
  connect(
    state => ({ authenticated: state.identity.authenticated }),
    dispatch => ({
      onSubmit: form => {
        const validated = validate(form);
        if (Object.keys(validated).length) {
          return Promise.reject(new SubmissionError(validated));
        }

        dispatch(stopSubmit(FORM_NAME, {}));
        return dispatch(IdentityActions.login(form.email, form.password));
      }
    })
  ),
  recompose.branch(
    props => props.authenticated,
    recompose.renderComponent(() => <Redirect to={RoutePaths.HOME} />)
  ),
  reduxForm({
    form: FORM_NAME,
    initialValues: {
      email: '',
      password: ''
    },
    persistentSubmitErrors: true,
  })
)(Login);
