import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link, NavLink} from 'react-router-dom'
import Event from '../lib/Event-service'
import Auth from '../lib/auth-service'
import User from '../lib/user-service'
import Iframe from 'react-iframe'

import {ThemeProvider} from 'styled-components'
import {MyButton} from '../StyledComponents/Button'
import Wrapper from '../StyledComponents/Wrapper'

import ListItem from '../StyledComponents/ListItem'
import { withAuth } from '../lib/AuthProvider';




class EventDetail extends Component {
    state={
    event: null,
    isGoing: false,
    isMyEvent: false,
    coming: null,
    organizer: null,
    googleKey: process.env.GOOGLEKEY
    }

    getOneEvent=(eventId)=>{
        Event.getOne(eventId)
        .then((result) => {
            this.setState({event:result.data})
            this.getComingToEvent()
            this.findOrganizer()
            Auth.me()
            .then((user) => {
                if(result.data.comingIds.includes(user._id))
                {this.setState({isGoing: true})}
                if(result.data.organizerId === user._id)
                {this.setState({isMyEvent: true})}
            }).catch((err) => {
                console.log(err)
            });
            
    }).catch((err) => { 
    });
}
findOrganizer=()=>{
    User.getOneUser(this.state.event.organizerId)
    .then((result) => {
        this.setState({organizer: result.data})
    }).catch((err) => {
        
    });
}
        leaveEvent=()=>{
        const {eventId} = this.props.match.params
        Event.leave(eventId)
        .then((result) => {
        this.setState({isGoing: false , event: result.data})
        this.getComingToEvent()
        User.leaveEvent(eventId)
        .then((resultUser) => {
        }).catch((err) => {
            console.log(err)
        });
        }).catch((err) => {
        console.log(err);
        });
        }

        joinEvent=()=>{
            const {eventId} = this.props.match.params
            Event.join(eventId)
            .then((result) => {
            this.setState({isGoing: true, event: result.data})
            this.getComingToEvent()
            User.joinEvent(eventId)
            .then((resultUser) => {
            }).catch((err) => {
                console.log(err)
            });
            }).catch((err) => {
            console.log(err);
            });
        }

        getComingToEvent=()=>{
        const {comingIds} = this.state.event
        const promiseArr =[]
        comingIds.forEach((id)=>{
        promiseArr.push(User.getOneUser(id))
    })
    Promise.all(promiseArr)
    .then((result) => {
    this.setState({coming:result})
        }).catch((err) => {
        console.log(err)
        });
        }

        deleteEvent=()=>{
            Event.delete(this.state.event._id)
            .then((result) => {
            this.setState({isMyEvent: false})
            this.props.history.push('/events');
            }).catch((err) => {
                
            });
        }

    componentDidMount(){
        this.getOneEvent(this.props.match.params.eventId)

    }
    render() {
        const {event, coming, organizer, isMyEvent} = this.state;
        const { user, logout, isLoggedin } = this.props;
        
        return (
            <Wrapper
            style={{paddingTop:(isLoggedin ? "90" : "0")}}
            >
            {
              !isLoggedin?
              <div>
              <div className="fake-nav">
              <NavLink className="fake-link" to={`/login`}>Login </NavLink>
              <NavLink to={`/events-home`}><img src='/images/catch-me-there-logo-white.png' height="20" /></NavLink>
              <NavLink className="fake-link" to={`/signup`}>Signup </NavLink>
              </div>
              <hr></hr>
              </div>
              :
              null
            }
            {
                event != null ? 
                <div>
                <div className="event-details-text">
                <h1 style={{fontSize:"1.2em", textAlign: "left", margin: "15px 0"}}>{event.title}</h1>
                <h2>{event.description}</h2>
                <h2>Vibe: {event.vibe}</h2>
                <h2>Age range: {event.ageRange}</h2>
                {
                !event.relatedConcert?
                <div>
                <h2>{event.location}</h2>
                <h2>{event.city}</h2>
                <h2>{event.date}</h2>
                </div>
                :
                <div>
                <h2>{event.relatedConcert._embedded.venues[0].name}</h2>
                <h2>{event.relatedConcert._embedded.venues[0].address.line1}</h2>
                <h2>{event.relatedConcert._embedded.venues[0].city.name}</h2>
                <h2>{event.relatedConcert._embedded.venues[0].country.name}</h2>
                </div>
                }
                {
                event.maxPeople != null?
                <h2>coming {event.coming}/{event.maxPeople}</h2>
                :
                <h2>coming {event.coming}</h2>
                }
                {
                event.photo?
                <img src={event.photo} width="100%vw" style={{margin: "15px 0"}} />
                :
                event.relatedConcert?
                <img src={event.relatedConcert.images[0].url} width="100%vw" style={{margin: "15px 0"}} />
                :
                null
                }
                </div>
                {
                    event.relatedConcert?
                    <div>
                    <h1 style={{textShadow: "3px 3px 8px black",
                    padding: "0 10px",
                    fontSize: "1em",
                    textAlign: "left"}}>Related to:</h1> 
                    <div className="related-concert">
                    <div>
                    <Link className="text-related" to={`/concertDetail/${event.relatedConcert.id}`}>
                    <h2>{event.relatedConcert.name}</h2>
                    <h2>{event.relatedConcert._embedded.venues[0].name}</h2>
                    </Link>
                    </div>
                    <div>
                    <Link className="text-related" to={`/concertDetail/${event.relatedConcert.id}`}>
                    <img src={event.relatedConcert.images[0].url} width="100"/>
                    </Link>
                    </div>
                    </div>

                    <Iframe url={`https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_GOOGLEKEY}&q=${event.relatedConcert._embedded.venues[0].address.line1}+${event.relatedConcert._embedded.venues[0].city.name}`}
                    width="100%vw"
                    height="300px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
                    </div>
                    :
                    <Iframe url={`https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_GOOGLEKEY}&q=${event.location}+${event.city}`}
                    width="100%vw"
                    height="300px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
                }
                {
                    !this.state.isGoing && (event.maxPeople > event.coming || event.maxPeople === null)?
                    (
                    isLoggedin?
                    <MyButton blue onClick={this.joinEvent}>Join this hangout</MyButton>
                    :
                    <MyButton blue ><Link to={`/login`} style={{color: "white", textDecoration: "none"}}> Join this hangout </Link></MyButton>
                    )
                    :
                    this.state.isGoing?
                    <div>
                    <MyButton red onClick={this.leaveEvent}>Leave this hangout</MyButton>
                    <MyButton special> <a href={event.whatsAppGroup}><h2>WhatsApp group</h2> </a> </MyButton>
                    </div>
                    :
                    <h2>Fully booked</h2>
                }
                {
                organizer ?
                <div className="coming">
                <p>Organizer: <Link to={`/profile/${organizer._id}`} style={{color: "white", textDecoration: "none", fontSize: "0.9em", textDecoration: "underline"}}>{organizer.username}</Link></p>
                </div>
                :
                null
                }
                {
                    coming?(
                        <div className="coming">
                        <h2>Who is coming?</h2>
                        <ul style={{listStyleType: "none", textAlign: "left"}}>
                        {coming.map(user => (
                            <li key={user.data._id}>
                                <Link to={`/profile/${user.data._id}`} 
                                key={user.data._id}
                                style={{color: "white", textDecoration: "none", fontSize: "0.8em", textDecoration: "underline", textAlign: "left", display: "flex", justifyContent: "flex-start"}}> 
                                {user.data.username} </Link>
                            </li>)
                        )}
                        </ul>
                        </div>
                    )
                    :
                    null
                }
                {
                    isMyEvent?
                    <MyButton red onClick={this.deleteEvent} style={{width: "60%"}} >delete</MyButton>
                    :null
                }
                {
                        <MyButton black onClick={ () => this.props.history.goBack()} style={{width: "50%", marginBottom: "10px"}} >back</MyButton>
                }
                </div>
                :
                <img src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjRgpThsLrmAhWo4YUKHXLdDbMQjRx6BAgBEAQ&url=https%3A%2F%2Fgfycat.com%2Fdisastrousunnaturalapisdorsatalaboriosa-hockey&psig=AOvVaw1l_6ij8_XEziySAcx-gxIi&ust=1576592955573519"/>
            } 
            </Wrapper>
        )
    }
}


export default withAuth(EventDetail);