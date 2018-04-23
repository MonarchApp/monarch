import './notification.scss';
import Classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Notification = ({message, onClose, type}) => (
  <div className={Classnames('notification', type)}>
    <span className='message'>{message}</span>
    <button className='icon-close' onClick={onClose} />
  </div>
);

Notification.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['info', 'warning', 'error', 'success'])
};

export default Notification;
