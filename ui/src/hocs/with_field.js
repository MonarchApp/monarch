import Classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import * as recompose from 'recompose';

const getDisplayName = input => `WithField(${ typeof input === 'string' ?
  input :
  input.displayName || input.name || 'Component'
})`;

// Note that `input` and `meta` prop keys in the FieldWrapper
// are inherited from the redux-form Field component. See redux-form
// documentation for further information about what props to expect.
const withField = (Input) => {
  const FieldWrapper = ({
    autoFocus,
    className,
    errorId,
    id,
    input,
    label,
    meta: {error},
    required,
    type
  }) =>
    <div
      className={Classnames(className, {error}, 'field')}
      test-label='HOC/field-wrapper'>
      <label
        htmlFor={id}
        test-label='HOC/field-label'>
        <span className='label-text'>{label}</span>
        <Input
          aria-describedby={errorId}
          aria-invalid={error && true}
          autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
          className='input'
          id={id}
          required={required}
          type={type}
          {...input}/>
      </label>
      {error && <span
        className='error-message'
        id={errorId}
        role='alert'
        test-label='HOC/field-error'>
        {error}
      </span>}
    </div>;

  FieldWrapper.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    errorId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    label: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    }),
    required: PropTypes.bool,
    type: PropTypes.string.isRequired
  };

  FieldWrapper.displayName = getDisplayName(Input);

  FieldWrapper.defaultProps = {
    meta: {}
  };

  const enhance = recompose.mapProps(props => Object.assign({}, {
    errorId: `form-message-${props.input.name}`,
    id: `form-${props.input.name}`
  }, props));

  return enhance(FieldWrapper);
};

export default withField;
