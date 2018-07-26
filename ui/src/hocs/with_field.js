import Classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import * as recompose from 'recompose';

const getDisplayName = input => `WithField(${ typeof input === 'string' ?
  input :
  input.displayName || input.name || 'Component'
})`;

const withField = (Input) => {
  const FieldWrapperComponent = ({
    className,
    errorId,
    id,
    input,
    label,
    meta: {error},
    type
  }) =>
    <div
      className={Classnames({className, error}, 'field')}
      testdatalabel='HOC/field-wrapper'
    >
      <label
        htmlFor={id}
        testdatalabel='HOC/field-label'>
        <span className='label'>{label}</span>
        <Input {...input} aria-describedby={errorId} className='input' id={id} type={type}/>
      </label>
      {error && <span
        className='error-message'
        id={errorId}
        testdatalabel='HOC/field-error'>
        {error}
      </span>}
    </div>;

  FieldWrapperComponent.propTypes = {
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
    type: PropTypes.string.isRequired
  };

  FieldWrapperComponent.displayName = getDisplayName(Input);

  FieldWrapperComponent.defaultProps = {
    meta: {}
  };

  const enhance = recompose.mapProps(props => Object.assign({}, {
    errorId: `form-message-${props.input.name}`,
    id: `form-${props.input.name}`
  }, props));

  const FieldWrapper = enhance(FieldWrapperComponent);

  return FieldWrapper;
};

export default withField;
