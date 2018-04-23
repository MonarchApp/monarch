import PropTypes from 'prop-types';
import React from 'react';
import Classnames from 'classnames';

const getDisplayName = input => `WithField(${ typeof input === 'string' ?
  input :
  input.displayName || input.name || 'Component'
})`;


const withField = Input => {
  const FieldWrapper = ({
    input,
    label,
    meta: {error, warning},
    type
  }) =>
    <div className={Classnames({error, warning}, 'field')}>
      <label htmlFor={input.name}>
        {label}
        <Input {...input} type={type}/>
      </label>
      {error && <span className='error-message'>{error}</span>}
      {warning && <span className='warning-message'>{warning}</span>}
    </div>;

  FieldWrapper.displayName = getDisplayName(Input);

  FieldWrapper.defaultProps = {
    meta: {}
  };

  FieldWrapper.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      warning: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    }),
    type: PropTypes.string
  };

  return FieldWrapper;
};

withField.propTypes = {
  Component: PropTypes.element
};

export default withField;
