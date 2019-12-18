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
    //console.log("in navbar", this.props)
    return (

      <NavBarStyle>
        {isLoggedin ? (
          <div>
          <article>
          <NavLink to={`/profile/${this.props.user._id}`} style={{textDecoration: "none"}} className="profile-top"><img className="profile-photo" src={user.photo} width="20"/><p className="name" >{user.username}</p></NavLink>
          <NavLink to={`/events`}><img src='/images/catch-me-there-logo-white.png' className="title" height="20" /></NavLink>
          {
          !this.state.showMenu?
          <img onClick={this.showMenu} src="https://icon-library.net/images/white-hamburger-menu-icon/white-hamburger-menu-icon-24.jpg" width="30"/>
          :
          <img onClick={this.showMenu} src="/images/X.png" width="18" height="18" style={{marginTop: "15px", marginLeft: "8px", marginRight: "4px"}}/>
          }
          </article>
          {
            this.state.showMenu?
          <ul className="folded">
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/events'>Events</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/concerts'>Concerts</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/addEvents'>Create Event</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} to={`/profile/${this.props.user._id}`} className="profile-link">Profile</NavLink></ListItem>
        <ListItem><button className="logout" onClick={logout}>Logout</button></ListItem>
        <ListItem className="drumLink" ><NavLink onClick={this.showMenu} className="nav-link" to='/drums'>ヅ Drums</NavLink></ListItem>
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
