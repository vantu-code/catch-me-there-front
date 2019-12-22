import axios from 'axios'
import React, { Component } from 'react';
import Event from '../lib/Event-service'
import {Link, NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import EventStyle from '../StyledComponents/EventStyle'
import Wrapper from '../StyledComponents/Wrapper'
import InputLine from '../StyledComponents/InputLine'
import {MyButton} from '../StyledComponents/Button'
import { withAuth } from '../lib/AuthProvider';
// import {NavLink} from 'react-router-dom';


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
    if (city === ""){
    this.getAllEvents()
    }
    else {
    const eventArr = [...events]
    const result = eventArr.filter(event=>
      event.city.toLowerCase() === city.toLowerCase()
    )
    this.setState({eventsCopy: result})
    //console.log(result, " events", events)
    }
  };

  handleInput = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.getAllEvents();

  }
  render() {
    const { user, logout, isLoggedin } = this.props;
    const {events, eventsCopy} = this.state;
    // console.log("logged in", isLoggedin)
    // console.log("props", this.props)
    //console.log("check", events)
    return (
      <Wrapper
      style={{paddingTop:(isLoggedin ? "90" : "0")}}
      >
      {
        !isLoggedin?
        <div>
        <div className="fake-nav">
        <Link className="fake-link" to={`/login`}>Login </Link>
        <Link to={`/events-home`}><img src='/images/catch-me-there-logo-white.png' height="20" /></Link>
        <Link className="fake-link" to={`/signup`}>Signup </Link>
        </div>
        <hr></hr>
        </div>
        :
        null
      }
  {
    <form onSubmit={this.handleSubmit}>

    <br></br>
    <label>City</label>
     <InputLine 
     onChange={this.handleInput} 
     type="text" 
     name="city" 
     
     value={this.state.city} />
     <MyButton small >Search</MyButton>
     </form>
 }
 {
          eventsCopy.map((event, i)=>{
          return (
          <Link to={(isLoggedin? `/eventDetail/${event._id}`: `/eventDetail-home/${event._id}`)} style={{textDecoration: "none"}} key={i}>
          <EventStyle 
          key={event._id}>
          <div>
          <h1>{event.title}</h1>
          {
          !event.relatedConcert?
          <h1>{event.city}</h1>
          :
          <h1>{event.relatedConcert._embedded.venues[0].city.name}</h1>
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
          <img src={event.photo}/>
          </div> 
          :
          event.relatedConcert?
          <div>
          <img src={event.relatedConcert.images[1].url}/>
          </div> 
          :
          null
          }
          </EventStyle>
          </Link>

          )
        })
      }
      </Wrapper>
    );
  }
}

export default withAuth(Events);
