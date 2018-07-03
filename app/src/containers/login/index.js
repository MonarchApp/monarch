import AuthActions from './actions';
import Immutable from 'immutable';
import Login from 'components/login';
import validate from './validate';
import {connect} from 'react-redux';
import {reduxForm, stopSubmit, SubmissionError} from 'redux-form/immutable';
import './login.scss';

const FORM_NAME = 'login';

const LoginForm = reduxForm({
  form: FORM_NAME,
  initialValues: Immutable.Map({
    email: '',
    password: ''
  }),
  persistentSubmitErrors: true,
})(Login);

export default connect(
  null,
  dispatch => ({
    onSubmit: form => {
      const validated = validate(form);
      if (Object.keys(validated).length) {
        return Promise.reject(new SubmissionError(validated));
      }

      dispatch(stopSubmit(FORM_NAME, {}));
      return dispatch(AuthActions.login(form.get('email'), form.get('password')));
    }
  })
)(LoginForm);
