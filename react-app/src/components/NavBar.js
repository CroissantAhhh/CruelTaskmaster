
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/session';
import LogoutButton from './auth/LogoutButton';

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(sessionUser ? true : false);
  }, [sessionUser])

  async function demoLogin(e) {
    e.preventDefault();
    await dispatch(login("jasonzhou8597@gmail.com", "jasonzhou2"));
    history.push("/home");
  };

  const onLogout = async (e) => {
    await dispatch(logout());
    setLoggedIn(false);
    history.push("/")
  };

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
      {loggedIn ? (
        <div className="nav-bar-logged-in">
          <div className="site-nav-bar-utils">
            <div className="dropdown-board-links">
              <div className="nav-hover-container">
                <p>Recent</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="create-new-environment-board">
              <div className="nav-hover-container">
                <p>Create</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="placeholder-section-logged"></div>
          <div className="site-nav-bar-auth">
            <div className="user-message">
              <p>{sessionUser?.username}</p>
            </div>
            <div className="logout-button" onClick={onLogout}>
              <p>Logout&nbsp;&nbsp;</p>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="nav-bar-logged-out">
          <div className="warning-message">
            <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637966100/accessdenied_1_ua0spx.png" alt="stop icon" height="40px"></img>
            <p className="unauthed">Authorized Personnel Only</p>
            <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637966100/accessdenied_1_ua0spx.png" alt="stop icon" height="40px"></img>
          </div>
          <div className="placeholder-section"></div>
        </div>
      )}

    </div>
  );
}
