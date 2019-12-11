import axios from 'axios'
import React, { Component } from 'react';
import Event from '../lib/Event-service'

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
    console.log("check", events)
    return (
      <div>{
        events.map((event)=>{
          return (
          <div key={event._id}>
          <h1>{event.title}</h1>
          <h2>{event.date}</h2>
          <img src={event.photo} height={150}/>
          </div>
          )
        })
      }
      </div>
    );
  }
}

export default Events;
