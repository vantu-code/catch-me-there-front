import axios from 'axios'
import React, { Component } from 'react';
import Event from '../lib/Event-service'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import EventStyle from '../StyledComponents/EventStyle'
import Wrapper from '../StyledComponents/Wrapper'
import InputLine from '../StyledComponents/InputLine'
import {MyButton} from '../StyledComponents/Button'


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [],
      eventsCopy: [],
      city: ""
    };
  }
play=()=>{
  this.state.sound.play()
}
  getAllEvents=()=>{
    axios
    .get(`${process.env.REACT_APP_API_URL}/events`, { withCredentials: true})
    .then((result) => {
      this.setState({events: result.data, eventsCopy: result.data})
    }).catch((err) => {
      
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const {events, eventsCopy, city} = this.state
    const eventArr = [...events]
    const result = eventArr.filter(event=>
      event.city.toLowerCase() === city.toLowerCase()
    )
    this.setState({eventsCopy: result})
    console.log(result, " events", events)
  };

  handleInput = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.getAllEvents();

  }
  render() {
    const {events, eventsCopy} = this.state;
    console.log("check", events)
    return (
      <Wrapper>
  {
    <form onSubmit={this.handleSubmit}>

    <label>City</label>
     <InputLine 
     onChange={this.handleInput} 
     type="text" 
     name="city" 
     
     value={this.state.city} />
     <MyButton small style={{marginTop: "5px"}}>Search</MyButton>
     </form>
 }
 {
          eventsCopy.map((event, i)=>{
          return (
            
          <EventStyle key={event._id}>
          <div>
          <Link to={`/eventDetail/${event._id}`} style={{textDecoration: "none"}}><h1>{event.title}</h1></Link>
          {
          !event.relatedConcert?
          <Link to={`/eventDetail/${event._id}`} style={{textDecoration: "none"}}><h1>{event.city}</h1></Link>
          :
          <Link to={`/eventDetail/${event._id}`} style={{textDecoration: "none"}}><h1>{event.relatedConcert._embedded.venues[0].city.name}</h1></Link>
          }
          {
          event.relatedConcert?
          <div>
          <h2>{event.relatedConcert.dates.start.localDate}</h2>
          <h2>{event.relatedConcert._embedded.venues[0].name}</h2>
          <h2>related to: {event.relatedConcert.name}</h2>
          </div>
          :
          <div>
          <h2>{event.date}</h2>
          <h2>{event.location}</h2>
          </div>
          }
          </div>
          {
          event.photo?
          <div>
          <Link to={`/eventDetail/${event._id}`}><img src={event.photo}/></Link>
          </div> 
          :
          event.relatedConcert?
          <div>
          <Link to={`/eventDetail/${event._id}`}><img src={event.relatedConcert.images[1].url}/></Link>
          </div> 
          :
          null
          }
          </EventStyle>

          )
        })
      }
      </Wrapper>
    );
  }
}

export default Events;
