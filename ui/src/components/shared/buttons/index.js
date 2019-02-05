import PropTypes from 'prop-types';
import React from 'react';
import './buttons.scss';

const PrimaryButton = ({disabled, text, type}) =>
  <button
    className='primary button'
    disabled={disabled}
    type={type}
  >
    {text}
  </button>;

PrimaryButton.displayName = 'Primary Button';
PrimaryButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'reset', 'button'])
};


export {PrimaryButton};
