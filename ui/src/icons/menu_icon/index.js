import './menu_icon.scss';
import React from 'react';

const MenuIcon = () =>
  <svg viewBox='0 0 32 10' className='menu-icon'>
    <polygon points='2 5, 5 2, 8 5, 5 8'/>
    <polygon points='13 5, 16 2, 19 5, 16 8'/>
    <polygon points='24 5, 27 2, 30 5, 27 8'/>
  </svg>;

MenuIcon.displayName = 'Menu Icon';

export default MenuIcon;
