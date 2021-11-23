
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/session';
import LogoutButton from './auth/LogoutButton';

export default function NavBar() {
  const dispatch = useDispatch();

  function demoLogin() {
    dispatch(login("jasonzhou8597@gmail.com", "jasonzhou2"));
  }

  return (
    <nav className="site-nav-bar">
      <ul>
        <li>
          <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637700432/cruelTaskmasterLogoWhite_h6nw0r.png" height="60px" alt="site logo"></img>
        </li>
        <li>
          <NavLink to='/home' exact={true} activeClassName='active'>
          <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637700246/CTMBrand_xoslo6.png" height="60px" alt="site logo"></img>
          </NavLink>
        </li>

        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <button className="demo-login" onClick={demoLogin}>Demo Login</button>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}
