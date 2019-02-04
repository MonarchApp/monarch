import SignupActions from "./actions";
import Signup from "components/signup";
import validate from "./validate";
import {connect} from "react-redux";
import {reduxForm, stopSubmit, SubmissionError} from "redux-from";

const FORM_NAME = "signup";
const SignupForm = reduxForm({
  form: FORM_NAME,
  initialValues: {
    email: '',
    password: '',
    username: ''
  },
  persistentSubmitErrors: true
})(Signup);

const mapToProps = (state) => ({
  step: state.signup.step
});

const actionAsProps = dispatch => ({
  onSubmit: form => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      return Promise.reject(new SubmissionError(validationErrors));
    }

    dispatch(stopSubmit(FORM_NAME, {}));
    dispatch(SignupActions.nextStep(form));
  }
})

export default connect(mapToProps, actionAsProps)(LoginForm)
