import React, { Component } from 'react';
import { Link, NavLink, Route  } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

import styled, {ThemeProvider} from 'styled-components'
import NavBarStyle from '../StyledComponents/NavBarStyle'
import ListItem from '../StyledComponents/ListItem'

import Profile from './Profile'
import Concerts from '../pages/Concerts'

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
  hideMenu=()=>{
    this.setState({showMenu: false})
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
    // console.log("in navbar", this.props)
    return (
      
      <div>
      <NavBarStyle className="nav-bar">
        {isLoggedin ? (
          <div>
          <article>
          <NavLink to={`/profile/${this.props.user._id}`} style={{textDecoration: "none"}} className="profile-top" onClick={this.hideMenu}><img className="profile-photo" src={user.photo} width="20"/><p className="name" >{user.username}</p></NavLink>
          <NavLink to={`/events`}><img src='/images/catch-me-there-logo-white.png' className="title" height="20" onClick={this.hideMenu}/></NavLink>
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
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/concerts'>Concerts</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/events'>Hang-outs</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/addEvents'>Create Hang-out</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} to={`/profile/${this.props.user._id}`} className="profile-link">Profile</NavLink></ListItem>
        <ListItem><button className="logout" onClick={logout}>Logout</button></ListItem>
        <ListItem className="drumLink" ><NavLink onClick={this.showMenu} className="nav-link" to='/drums'>ヅ Drums</NavLink></ListItem>
        </ul>
        :
        null
          }  
          </div>
        ) : null
        }
      </NavBarStyle>

        <NavBarStyle className="nav-desktop">
        {isLoggedin ? (
          <div className="side-bar">
          <article>
          <NavLink to={`/events`}><img src='/images/catch-me-there-logo-white.png' alt="Menu"className="title" onClick={this.hideMenu}/></NavLink>
          {/* {
          !this.state.showMenu?
          <img onClick={this.showMenu} src="https://icon-library.net/images/white-hamburger-menu-icon/white-hamburger-menu-icon-24.jpg" width="30"/>
          :
          <img onClick={this.showMenu} src="/images/X.png" width="18" height="18" style={{marginTop: "15px", marginLeft: "8px", marginRight: "4px"}}/>
          } */}
          </article>
          {
          <ul className="folded">
        <ListItem className="menuLink"><NavLink to={`/profile/${this.props.user._id}`} style={{textDecoration: "none", border: "none"}} className="profile-top" onClick={this.hideMenu}><img className="profile-photo" src={user.photo} width="60"/><p className="name" >{user.username}</p></NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/concerts'>Concerts</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/events'>Hang-outs</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} className="nav-link" to='/addEvents'>Create Hang-out</NavLink></ListItem>
        <ListItem className="menuLink"><NavLink onClick={this.showMenu} to={`/profile/${this.props.user._id}`} className="profile-link">Profile</NavLink></ListItem>
        <ListItem><button className="logout" onClick={logout}>Logout</button></ListItem>
        <ListItem className="drumLink" ><NavLink onClick={this.showMenu} className="nav-link" to='/drums'>ヅ Drums</NavLink></ListItem>
        </ul>
          }  
          </div>
        ) : null
        }
      </NavBarStyle>
      <div className="main-title">
      {/* <NavLink to={`/events`}><img src='/images/catch-me-there-logo-white.png' height="20" /></NavLink> */}
      </div>

      {
      user?
      <div className="all-time-profile">
      {/* <NavLink to={`/profile/${this.props.user._id}`} 
      style={{textDecoration: "none"}} onClick={this.hideMenu}>
      <img className="profile-photo" src={user.photo} width="70"/>
      <p className="name" >{user.username}</p>
      </NavLink> */}
      {/* <Profile match={{params: {userId: this.props.user._id}}} fakeProps={user} /> */}
      </div>
      :
      null
      }
      </div>
    );
  }
}

export default withAuth(Navbar);
