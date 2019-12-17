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
      events: [],
      sound: document.getElementById("click"),
    };
  }
play=()=>{
  this.state.sound.play()
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
        events.map((event, i)=>{
          return (
            event.title?
          <EventStyle key={event._id}>
          <div>
          <Link to={`/eventDetail/${event._id}`}><h1>{event.title}</h1></Link>
          {
          event.relatedConcert?
          <div>
          <h2>{event.relatedConcert.dates.start.localDate}</h2>
          <h2>{event.relatedConcert._embedded.venues[0].name}</h2>
          <h2>{event.relatedConcert.name}'s conert</h2>
          </div>
          :
          <div>
          <h2>{event.date}</h2>
          <h2>{event.location}</h2>
          </div>
          }
          </div>
          <div>
          <Link to={`/eventDetail/${event._id}`}><img src={event.photo}/></Link>
          </div> 
          </EventStyle>
         :<h1 key={i}>empty</h1>
          )
        })
      }
      </Wrapper>
    );
  }
}

export default Events;
