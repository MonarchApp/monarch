import * as R from 'ramda';
import * as recompose from 'recompose';
import IdentityActions from './actions';
import PropTypes from 'prop-types';
import React from 'react';
import withField from 'hocs/with_field';
import { Field } from 'redux-form';
import { InlineErrorNotification } from 'components/shared/inline_notifications';
import { PrimaryButton } from 'components/shared/buttons';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit } from 'redux-form';

const InputField = withField('input');
const TextAreaField = withField('textarea');

const EditProfile = ({ error, handleSubmit, submitting }) =>
  <div className='edit-profile-form-wrapper'>
    <form
      className='edit-profile-form inline-label-form'
      noValidate
      onSubmit={handleSubmit}>
      {error && <InlineErrorNotification message={error} />}
      <Field
        component={InputField}
        label='Preferred Name'
        name='name'
        required
        type='text' />
      <Field
        component={InputField}
        label='Email'
        name='email'
        type='email' />
      <Field
        component={TextAreaField}
        label='Bio'
        name='bio'
        type='text' />
      <div className='field-info'>
        {`Tell folks a little about yourself! Hobbies, TV shows, or
          whatever you want. \rDon't sweat it if you'd rather not; a bio
          is not required.`}
      </div>
      <PrimaryButton
        disabled={submitting}
        text='Submit'
        type='submit'/>
    </form>
  </div>;

EditProfile.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

const FORM_NAME = 'editProfile';

const EditProfileForm = recompose.compose(
  reduxForm({
    form: FORM_NAME,
    initialValues: {
      bio: '',
      email: '',
      name: ''
    },
    persistentSubmitErrors: true,
  }),
  connect(
    null,
    dispatch => ({
      onSubmit: form => {
        dispatch(stopSubmit(FORM_NAME, {}));
        return dispatch(IdentityActions.login(
          R.pick(form, ['bio', 'email', 'name'])
        ));
      }
    })
  )
)(EditProfile);

export { EditProfile, EditProfileForm };
