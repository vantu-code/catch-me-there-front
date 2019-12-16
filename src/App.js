import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';


import Signup from './pages/Signup';
import Login from './pages/Login';
import Events from './pages/Events';
import Concerts from './pages/Concerts'
import Navbar from './components/Navbar';
import ConcertDetail from  './components/ConcertDetail'
import AddEvent from './components/AddEvent'
import EventDetail from './components/EventDetail'
import Profile from './components/Profile'

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import dotenv from 'dotenv'
dotenv.config()



class App extends Component {
  render() {

    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL);


    return (
      <div className="App">
        <Navbar />
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/profile/:userId" component={Profile} />
          <PrivateRoute exact path="/profile/" component={Profile} />
          <PrivateRoute exact path="/events" component={Events} />
          <PrivateRoute exact path="/eventDetail/:eventId" component={EventDetail} />
          <PrivateRoute exact path="/concerts" component={Concerts} />
          <PrivateRoute exact path="/addEvents" component={AddEvent} />
          <PrivateRoute exact path="/addEvents/:concertId" component={AddEvent} />
          <PrivateRoute exact path="/concertDetail/:concertId" component={ConcertDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
