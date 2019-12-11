import React, { Component } from 'react'
import axios from 'axios'
import Event from '../lib/Event-service'
import { log } from 'util';

export default class AddEvent extends Component {
    state={
    whatsAppGroup: "", 
    title: "", 
    description: "", 
    vibe: "",
    maxPeople: 30,
    coming: 0, 
    location: "", 
    date: "", 
    hour: "", 
    ageRange: "", 
    photo: "", 
    themeSong: "", 
    concertId: "",
    relatedConcert: "",
    city: "",
    country: ""
    }

    getOneConcert(concertId){
        console.log("props", this.props.match.params.concertId)
        axios
        .get(`https://app.ticketmaster.com/discovery/v2/events.json?id=${concertId}&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y`)
        .then((result) => {
            this.setState({relatedConcert: result.data._embedded.events[0]})
        }).catch((err) => {
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.createEvent()
      };
    
      handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

    createEvent=()=>{
        Event.create(this.state)
    }
    componentDidMount(){
        const { concertId } = this.props.match.params
        if(concertId)
        {this.setState({concertId: concertId})}
        this.getOneConcert(concertId);
    }
    render() {
        return (
            <div>
            {
                this.state.concertId? 
                <div>
                <h2>Create your group for the concert:</h2>
                <h1>{this.state.relatedConcert.name}</h1>
                </div>
                :
                <h1>Create your awesome event</h1>
            }
    <form onSubmit={this.handleSubmit}>

    <label>WhatsApp Group</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="whatsAppGroup" 
     value={this.state.whatsAppGroup} />

     <label>Title</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="title" 
     value={this.state.title} />

     <label>Description</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="description" 
     value={this.state.description} />

     <label>Vibe</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="vibe" 
     value={this.state.vibe} />

     <label>Max People</label>
     <input 
     onChange={this.handleInput} 
     type="number" 
     name="maxPeople" 
     value={this.state.maxPeople} />

     <label>Date</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="date" 
     value={this.state.date} />

     <label>Location</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="location" 
     value={this.state.location} />

    <label>Hour</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="hour" 
     value={this.state.hour} />

    <label>Age Range</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="ageRange" 
     value={this.state.ageRange} />

    <label>Photo</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="photo" 
     value={this.state.photo} />

    <label>Theme Song</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="themeSong" 
     value={this.state.themeSong} />

    <label>City</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="city" 
     value={this.state.city} />

    <label>Country</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="country" 
     value={this.state.country} />


     <button>Submit</button>
     </form>
        </div>
        )
    }
}


