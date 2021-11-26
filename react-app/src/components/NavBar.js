
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/session';
import LogoutButton from './auth/LogoutButton';

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  async function demoLogin(e) {
    e.preventDefault();
    await dispatch(login("jasonzhou8597@gmail.com", "jasonzhou2"));
    history.push("/home");
  }

  return (
    <div className="site-nav-bar">
      <div className="site-nav-bar-logo-area">
        <div className="site-logo">
          <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637700432/cruelTaskmasterLogoWhite_h6nw0r.png" height="60px" alt="site logo"></img>
        </div>
        <div className="site-name">
          <NavLink to='/home' exact={true} activeClassName='active'>
          <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637700246/CTMBrand_xoslo6.png" height="60px" alt="site logo"></img>
          </NavLink>
        </div>
      </div>
      <div className="site-nav-bar-utils">
        <div className="dropdown-board-links">
          Recent
        </div>
        <div className="create-new-environment-board">
          Create
        </div>
      </div>
      <div className="site-nav-bar-auth">
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        <div>
          <button className="demo-login" onClick={demoLogin}>Demo Login</button>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
