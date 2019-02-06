import React from 'react';
import './header.scss';
import FullLogo from 'icons/full_logo';

const Header = () =>
  <header className='header'>
    <FullLogo />
    <div className='avatar' />
  </header>;

Header.displayName = 'Header';

export {Header};
