import Classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import * as recompose from 'recompose';
import './inline_notifications.scss';

const InlineNotification = ({className, message}) =>
  <div className={Classnames('inline-notification', className)}>{message}</div>;

InlineNotification.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired
};

const InlineErrorNotification = recompose.withProps({
  className: 'error'
})(InlineNotification);

InlineErrorNotification.displayName = 'InlineErrorNotification';

InlineErrorNotification.propTypes = {
  message: PropTypes.string.isRequired
};

export {InlineErrorNotification};
