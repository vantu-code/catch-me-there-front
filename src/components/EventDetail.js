import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'
import Event from '../lib/Event-service'
import Auth from '../lib/auth-service'



export default class EventDetail extends Component {
    state={
    event: null,
    isGoing: false
    }

    getOneEvent=(eventId)=>{
        Event.getOne(eventId)
        .then((result) => {
            console.log("event-here result",  this.props)
            //result.data.comingIds
            this.setState({event:result.data}, ()=>console.log("event-here", this.state.event))
            Auth.me()
            .then((user) => {
                if(result.data.comingIds.includes(user._id))
                {this.setState({isGoing: true})}
                console.log("auth", user._id)
            }).catch((err) => {
                
            });
            // if(req.session.currentUser)
            console.log("can I continue?");
            
    }).catch((err) => { 
    });
}
        leaveEvent=()=>{
        Event.leave(this.props.match.params.eventId)
        .then((result) => {
        this.setState({isGoing: false})
        this.forceUpdate()
        console.log("leave event", result)
        }).catch((err) => {
        console.log(err);
        });
        }

        joinEvent=()=>{
            Event.join(this.props.match.params.eventId)
            .then((result) => {
            this.setState({isGoing: true})
            console.log("join event", result)
            this.forceUpdate()
            }).catch((err) => {
            console.log(err);
            });
        }

    componentDidMount(){
        this.getOneEvent(this.props.match.params.eventId)
    }
    render() {
        const {event} = this.state;
        return (
            <div>
            {
                event != null ? 
                <div>
                <img src={event.photo} width="300"/>
                <h1>{event.title}</h1>
                <h2>{event.description}</h2>
                <h2>{event.city}</h2>
                <h2>{event.date}</h2>
                <h2>coming {event.coming}/{event.maxPeople}</h2>
                {
                !this.state.isGoing?
                <button onClick={this.joinEvent}>Join this event</button>
                :
                <button onClick={this.leaveEvent}>Leave this event</button>
                }
                    {
                    event.relatedConcert?
                    <h1>realted to: {event.relatedConcert.name}</h1>
                    :
                    null
                    }
                </div>
                :
                <h1>loading</h1>
            } 
            </div>
        )
    }
}
