import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

import styled, {ThemeProvider} from 'styled-components'
import NavBarStyle from '../StyledComponents/NavBarStyle'

import Auth from '../lib/auth-service'

class Navbar extends Component {
  state={
    user: {}
  }
  componentDidMount(){
    Auth.me()
    .then((result) => {
      this.setState({user: result})
    }).catch((err) => {
      
    });
  }
  render() {
    const { user, logout, isLoggedin } = this.props;
    console.log("in navbar", this.props)
    return (

      <NavBarStyle>
        {isLoggedin ? (
          <div>
          <h1>Catch Me There</h1>
          <button className="profile-link"><NavLink to={`/profile/${this.state.user._id}`}>Profile</NavLink></button>
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

    );
  }
}

export default withAuth(Navbar);
