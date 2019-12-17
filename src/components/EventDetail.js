import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'
import Event from '../lib/Event-service'
import Auth from '../lib/auth-service'
import User from '../lib/user-service'
import Iframe from 'react-iframe'

import {ThemeProvider} from 'styled-components'
import {MyButton} from '../StyledComponents/Button'
import Wrapper from '../StyledComponents/Wrapper'

import ListItem from '../StyledComponents/ListItem'




export default class EventDetail extends Component {
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
            console.log("event-here result",  this.props)
            this.setState({event:result.data}, ()=>console.log("event-here", this.state.event))
            this.getComingToEvent()
            this.findOrganizer()
            // goodNameConcert.name= this.goodNameFunc(goodNameConcert.name)
            // this.setState({concert: result.data._embedded.events[0]})
            Auth.me()
            .then((user) => {
                if(result.data.comingIds.includes(user._id))
                {this.setState({isGoing: true})}
                if(result.data.organizerId === user._id)
                {this.setState({isMyEvent: true})}
                console.log("event -     state", this.state)
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
        console.log("organizer", this.state.organizer)
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
            console.log('result back from leaving', resultUser)
        }).catch((err) => {
            console.log(err)
        });
        console.log("leave event", result)
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
                console.log('result back from joining', resultUser)
            }).catch((err) => {
                console.log(err)
            });
            // console.log("join event", result)
            //this.forceUpdate()
            }).catch((err) => {
            console.log(err);
            });
        }

        getComingToEvent=()=>{
        //console.log("this state event", this.state.event)
        const {comingIds} = this.state.event
        const promiseArr =[]
        comingIds.forEach((id)=>{
        promiseArr.push(User.getOneUser(id))
    })
    Promise.all(promiseArr)
    .then((result) => {
       this.setState({coming:result})
            //console.log("this state eventdetail", this.state)
        }).catch((err) => {
            
        });
        }

        deleteEvent=()=>{
            // console.log("delete-mode",this.state.event._id)
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
        //console.log("state", this.state);
        console.log('google',process.env);
        
        return (
            <Wrapper>
            {
                event != null ? 
                <div>
                <div className="event-details-text">
                <img src={event.photo} width="300"/>
                <h1>{event.title}</h1>
                <h2>{event.description}</h2>
                <h2>vibe: {event.vibe}</h2>
                <h2>{event.location}</h2>
                <h2>{event.city}</h2>
                <h2>{event.date}</h2>
                {
                event.maxPeople != null?
                <h2>coming {event.coming}/{event.maxPeople}</h2>
                :
                <h2>coming {event.coming}</h2>
                }
                </div>
                {
                    event.relatedConcert?
                    <div>
                    <h1 style={{textShadow: "3px 3px 8px black",
                    backgroundColor: "#56565696",
                    padding: "3px 5px",
                    borderRadius: "5px",
                    width: "fit-content",
                    margin: "0 auto"}}>related to:</h1> 
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
                {
                    !this.state.isGoing && (event.maxPeople > event.coming || event.maxPeople === null)?
                    <MyButton blue onClick={this.joinEvent}>Join this event</MyButton>
                    :
                    this.state.isGoing?
                    <div>
                    <MyButton red onClick={this.leaveEvent}>Leave this event</MyButton>
                    <MyButton special> <a href={event.whatsAppGroup}><h2>WhatsApp Group</h2> </a> </MyButton>
                    </div>
                    :
                    <h2>Fully booked</h2>
                }

                    <Iframe url={`https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_GOOGLEKEY}&q=${event.relatedConcert._embedded.venues[0].address.line1}+${event.relatedConcert._embedded.venues[0].city.name}`}
                    width="300px"
                    height="300px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
                    </div>
                    :
                    <Iframe url={`https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_GOOGLEKEY}&q=${event.location}+${event.city}`}
                    width="300px"
                    height="300px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
                }
                {
                organizer ?
                <div className="coming">
                <h2>Organizer</h2>
                <Link to={`/profile/${organizer._id}`} style={{color: "white", textDecoration: "none", fontSize: "0.8em"}}><h4>{organizer.username}</h4></Link>
                </div>
                :
                null
                }
                {
                    coming > 0 ? (
                        <div className="coming">
                        <h2>Who is coming?</h2>
                        <ul>
                        {coming.map(user => (
                            <ListItem key={user.data._id}>
                                <Link to={`/profile/${user.data._id}`} 
                                key={user.data._id}
                                style={{color: "white", textDecoration: "none", fontSize: "0.8em"}}> 
                                {user.data.username} </Link>
                            </ListItem>)
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
