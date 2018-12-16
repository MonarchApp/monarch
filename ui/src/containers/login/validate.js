const validate = values => {
  const keys = Object.keys(values);

  return keys.reduce(
    (errors, valueKey) => {
      if (values[valueKey]) return errors;
      errors[valueKey] = 'Required';
      return errors;
    },
    {}
  );
};

export default validate;
