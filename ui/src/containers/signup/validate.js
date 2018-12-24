const validators = {
  email: (errors, value) => {
    const [prefix = '', suffix = ''] = value.split('@')
    const hasDomain = suffix.split('.').length >= 2
    if (prefix && hasDomain) {
      return errors['email'] = 'Email does not appear to have the proper format.';
    }
    return errors;
  },
  password: (errors, value) => {
    if (value.length < 20) {
      return errors['password'] = 'Password does not meet minimum length.'
    }
  },
  username: (errors, value) => {
    if (value.length < 3) {
      return errors['username'] = 'Username does not meet minimum length.'
    }
  }
};

const validate = values => {
  const keys = Object.keys(values);
  return keys.reduce(
    (errors, valueKey) => {
      if (values[valueKey] && !validators[valueKey]) return errors;
      if (values[valueKey]) return validate[valueKey](errors, values[valueKey]);
      errors[valueKey] = 'Required';
      return errors;
    },
    {}
  );
};

export default validate;
