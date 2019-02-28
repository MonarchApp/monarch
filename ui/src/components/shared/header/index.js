import './header.scss';
import Classnames from 'classnames';
import FullLogo from 'icons/full_logo';
import MarkLogo from 'icons/mark_logo';
import MenuIcon from 'icons/menu_icon';
import PropTypes from 'prop-types';
import React, {useEffect, useState, useRef} from 'react';
import RoutePaths from 'constants/route_paths.js';
import {Link} from 'react-router-dom';

const MobileMenu = React.forwardRef(({open, toggleMenu}, ref) => {
  return (
    <nav className='mobile-menu-wrapper' ref={ref}>
      <button
        aria-controls='header-mobile-menu-button'
        aria-expanded={open}
        aria-haspopup={true}
        className='mobile-menu-button'
        id='header-mobile-menu-button'
        onClick={toggleMenu}>
        <MenuIcon />
      </button>
      {open &&
        <ul
          aria-label='Main Menu'
          className='mobile-menu'
          role='menu'>
          <li role='presentation'>
            <Link
              onClick={toggleMenu}
              role='menuitem'
              to={RoutePaths.CONNECT.CONVERSATIONS}>
              Conversations
            </Link>
          </li>
          <li role='presentation'>
            <Link
              onClick={toggleMenu}
              role='menuitem'
              to={RoutePaths.CONNECT.SIDEKICK}>
              Sidekick
            </Link>
          </li>
          <li className='divider' role='presentation' />
          <li role='presentation'>
            <Link
              onClick={toggleMenu}
              role='menuitem'
              to={RoutePaths.IDENTITY.USER_ACCOUNT}>
              Account
            </Link>
          </li>
          <li role='presentation'>
            <Link
              onClick={toggleMenu}
              role='menuitem'
              to={RoutePaths.IDENTITY.LOGOUT}>
              Log Out
            </Link>
          </li>
        </ul>}
    </nav>
  );
});

MobileMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

MobileMenu.displayName = 'Mobile Menu';

const MainMenu = () => {
  const menuRef = useRef(null);
  const [open, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!open);

  const handleOutsideClick = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  });

  return (
    <nav className='main-menu-wrapper'>
      <ul
        aria-label='Main menu'
        className='main-menu'
        role='menu'>
        <li role='presentation'>
          <Link role='menuitem' to={RoutePaths.CONNECT.CONVERSATIONS}>
            Conversations
          </Link>
        </li>
        <li role='presentation'>
          <Link role='menuitem' to={RoutePaths.CONNECT.SIDEKICK}>
            Sidekick
          </Link>
        </li>
      </ul>
      <div ref={menuRef}>
        <button
          aria-controls='header-user-navigation-button'
          aria-expanded={open}
          aria-haspopup={true}
          className='user-account-menu-button'
          id='header-user-navigation-button'
          onClick={toggleMenu}>
          <div className='avatar' />
        </button>
        {open &&
          <ul
            aria-label='User menu'
            className='user-account-menu'
            role='menu'>
            <li role='presentation'>
              <Link
                onClick={toggleMenu}
                role='menuitem'
                to={RoutePaths.IDENTITY.USER_ACCOUNT}>
                Account
              </Link>
            </li>
            <li role='presentation'>
              <Link
                onClick={toggleMenu}
                role='menuitem'
                to={RoutePaths.IDENTITY.LOGOUT}>
                Log Out
              </Link>
            </li>
          </ul>}
      </div>
    </nav>
  );
};

MainMenu.displayName = 'Main Menu';

const Header = () => {
  const menuRef = useRef(null);
  const [open, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!open);

  const handleOutsideClick = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  });

  return (
    <header className={Classnames('header', {open})} role='banner'>
      <MobileMenu ref={menuRef} toggleMenu={toggleMenu} open={open}/>
      <MainMenu />
      <MarkLogo />
      <FullLogo />
    </header>);
};

Header.displayName = 'Header';

export default Header;
