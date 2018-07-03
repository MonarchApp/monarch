const throwUtils = {};

throwUtils.throwWithMessage = (error, message) => {
  error.message = `${message}\n\nError:\n${error.message}`;
  throw error;
};

module.exports = throwUtils;
