import PropTypes from 'prop-types';
import React from 'react';
import Classnames from 'classnames';
import './side_navigation.scss';

const SideNavigation = ({children}) =>
  <nav className='side-navigation' aria-labelledby='side-navigation'>
    <ul className='side-navigation-list'>
      {children}
    </ul>
  </nav>;

SideNavigation.displayName = 'Side Navigation';
SideNavigation.propTypes = {
  children: PropTypes.node,
};

const SideNavigationItem = ({active, onClick, text}) =>
  <li className='side-navigation-item'>
    <button
      className={Classnames('side-navigation-button', {active})}
      onClick={onClick}
    >
      {text}
    </button>
  </li>;

SideNavigationItem.displayName = 'Side Navigation Item';
SideNavigationItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
};

export {SideNavigation, SideNavigationItem};
