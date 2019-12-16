import axios from 'axios'
import React, { Component } from 'react';
import Event from '../lib/Event-service'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import EventStyle from '../StyledComponents/EventStyle'
import Wrapper from '../StyledComponents/Wrapper'


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: []
    };
  }

  getAllEvents=()=>{
    axios
    .get("http://localhost:5000/events", { withCredentials: true})
    .then((result) => {
      this.setState({events: result.data})
    }).catch((err) => {
      
    });
  }
  componentDidMount() {
    this.getAllEvents();

  }
  render() {
    const {events} = this.state;
    // console.log("check", events)
    return (
      <Wrapper>{
        events.map((event)=>{
          return (
          <EventStyle key={event._id}>
          <Link to={`/eventDetail/${event._id}`}><h1>{event.title}</h1></Link>
          <h2>{event.date}</h2>
          <Link to={`/eventDetail/${event._id}`}><img src={event.photo} height={100}/></Link> 
          </EventStyle>
          )
        })
      }
      </Wrapper>
    );
  }
}

export default Events;
