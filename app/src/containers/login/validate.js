const validate = values => {
  return values
    .filter(value => !value)
    .reduce(
      (errors, __, valueKey) => {
        errors[valueKey] = 'Required';
        return errors;
      },
      {}
    );
};

export default validate;
