import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

import {themeProvider} from 'styled-components'
import NavBarStyle from '../StyledComponents/NavBarStyle'

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    console.log("in navbar", this.props)
    return (
      <themeProvider>
      <NavBarStyle>
        {isLoggedin ? (
          <div>
          <h1>Catch Me There</h1>
          <button className="profile-link"><NavLink to='/profile'>Profile</NavLink></button>
          <ul>
        <li><NavLink to='/concerts'>Concerts</NavLink></li>
        <li><NavLink to='/events'>Events</NavLink></li>
        <li><NavLink to='/addEvents'>Create Event</NavLink></li>
        </ul>
            <p>What's up {user.username}?</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              {' '}
              <button>Login</button>{' '}
            </Link>
            <br />
            <Link to="/signup">
              {' '}
              <button>Signup</button>{' '}
            </Link>
          </div>
        )}
      </NavBarStyle>
      </themeProvider>
    );
  }
}

export default withAuth(Navbar);
