import PropTypes from 'prop-types';
import React from 'react';

const Login = ({password, username}) => (
  <div>
    <input value={username} />
    <input value={password} />
  </div>
);

Login.propTypes = {
  password: PropTypes.string,
  username: PropTypes.string
};

export default Login;
