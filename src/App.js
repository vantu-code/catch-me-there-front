import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';


import Signup from './pages/Signup';
import Login from './pages/Login';
import Events from './pages/Events';
import Concerts from './pages/Concerts'
import Navbar from './components/Navbar';
import ConcertDetail from  './components/ConcertDetail'
import AddEvent from './components/AddEvent'

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/events" component={Events} />
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
