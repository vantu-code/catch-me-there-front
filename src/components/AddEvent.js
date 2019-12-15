import React, { Component } from 'react'
import axios from 'axios'
import Event from '../lib/Event-service'
import { log } from 'util';
import paintingService from '../lib/paintingService'
import Auth from '../lib/auth-service'

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
    relatedConcert: {},
    city: "",
    country: "",
    organizerId: "",
    }

    goodNameFunc=name=>{
        for (let i = 0; i < name.length; i++ ){
            if (name[i] === "-" || name[i] === "|" || name[i] === ":"){
                if (name[i-1] === " ") {
                    if (name[i-2] === " ") name = name.substring(0, i-2)
                    else name = name.substring(0, i-1)
                }
                else name = name.substring(0, i)
            return name
            }
          }
          return name
        }

    getOneConcert(concertId){
        console.log("props", this.props.match.params.concertId)
        axios
        .get(`https://app.ticketmaster.com/discovery/v2/events.json?id=${concertId}&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y`)
        .then((result) => {
            result.data._embedded.events[0].name= this.goodNameFunc(result.data._embedded.events[0].name)
            this.setState({relatedConcert: result.data._embedded.events[0]})
            this.setState({date: this.state.relatedConcert.dates.start.localDate,
            hour: this.state.relatedConcert.dates.start.localTime,
            location: this.state.relatedConcert._embedded.venues[0].address.line1,
            city: this.state.relatedConcert._embedded.venues[0].city.name,
            country: this.state.relatedConcert._embedded.venues[0].ccountry.name
            })
        }).catch((err) => {
            console.log(err);
        });
    }



    fileChange = (event) => {
        const file = event.target.files[0];
        const uploadData = new FormData()
        uploadData.append('photo', file)
        paintingService.imageUpload(uploadData)
        .then((image) => {
            this.setState({ photo: image })
        })
        .catch((error) => console.log(error))
      }

    handleSubmit = e => {
        e.preventDefault();
        Auth.me()
        .then((user) => {
            this.setState({organizerId: user._id})
            console.log("added-event", this.state)
            this.createEvent()
        }).catch((err) => {
            
        });
      };
    
      handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

    createEvent=()=>{
        console.log("statetocreate", this.state)
        Event.create(this.state)
        .then((result) => {
            console.log("after creating", result);
            
        // User.organizer()
        this.props.history.push('/events');
        }).catch((err) => {
            
        });
    }
    componentDidMount(){
        const { concertId } = this.props.match.params
        if(concertId){
        this.setState({concertId: concertId})
        this.getOneConcert(concertId);
        }
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

     <label>Coming</label>
     <input 
     onChange={this.handleInput} 
     type="number" 
     name="coming" 
     value={this.state.coming} />

     <label>Max People</label>
     <input 
     onChange={this.handleInput} 
     type="number" 
     name="maxPeople" 
     value={this.state.maxPeople} />

    <label>Age Range</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="ageRange" 
     value={this.state.ageRange} />

    <label>Photo-link</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="photo" 
     value={this.state.photo} />

    <input
          className="add-input"
          type="file"
          name="image"
          onChange={e => this.fileChange(e)}
        />
{
    this.state.concertId?
    null :

    <div>
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
     </div>
}
     <button>Submit</button>
     </form>

        </div>
        )
    }
}


