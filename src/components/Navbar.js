import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

import styled, {ThemeProvider} from 'styled-components'
import NavBarStyle from '../StyledComponents/NavBarStyle'
import ListItem from '../StyledComponents/ListItem'

import Auth from '../lib/auth-service'

class Navbar extends Component {
  state={
    user: {},
    showMenu: false,
  }

  showMenu=()=>{
    const showMenu = this.state.showMenu;
    this.setState({showMenu: !showMenu})
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
          <article>
          <NavLink to={`/profile/${this.props.user._id}`} className="profile-top"><img className="profile-photo" src={user.photo} width="20"/><p className="name">{user.username}</p></NavLink>
          <NavLink to={`/events`}><img src='/images/catch-me-there-logo-white.png' className="title" height="17" /></NavLink>
          <img onClick={this.showMenu} src="https://icon-library.net/images/white-hamburger-menu-icon/white-hamburger-menu-icon-24.jpg" width="30"/>
          </article>
          {
            this.state.showMenu?
          <ul className="folded">
        <ListItem style={{borderBottom: "0.1px solid rgb(133,133,133,72)"}}><NavLink onClick={this.showMenu} className="nav-link" to='/concerts'>Concerts</NavLink></ListItem>
        <ListItem style={{borderBottom: "0.1px solid rgb(133,133,133,72)"}}><NavLink onClick={this.showMenu} className="nav-link" to='/events'>Events</NavLink></ListItem>
        <ListItem style={{borderBottom: "0.1px solid rgb(133,133,133,72)"}}><NavLink onClick={this.showMenu} className="nav-link" to='/addEvents'>Create Event</NavLink></ListItem>
        <ListItem style={{borderBottom: "0.1px solid rgb(133,133,133,72)"}}><NavLink onClick={this.showMenu} to={`/profile/${this.props.user._id}`} className="profile-link">Profile</NavLink></ListItem>
        <ListItem style={{borderBottom: "0.1px solid rgb(133,133,133,72)"}}><NavLink onClick={this.showMenu} className="nav-link" to='/drums'>Drums</NavLink></ListItem>
        <ListItem><button className="logout" onClick={logout}>Logout</button></ListItem>
        </ul>
        :
        null
          }
            {/* <p>What's up {user.username}?</p> */}          
          </div>
        ) : null
        }
      </NavBarStyle>

    );
  }
}

export default withAuth(Navbar);
