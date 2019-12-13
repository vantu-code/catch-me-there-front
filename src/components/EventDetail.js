import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'
import Event from '../lib/Event-service'
import Auth from '../lib/auth-service'
import User from '../lib/user-service'



export default class EventDetail extends Component {
    state={
    event: null,
    isGoing: false,
    isMyEvent: false,
    coming: []
    }

    getOneEvent=(eventId)=>{
        Event.getOne(eventId)
        .then((result) => {
            console.log("event-here result",  this.props)
            //result.data.comingIds
            this.setState({event:result.data}, ()=>console.log("event-here", this.state.event))
            this.getComingToEvent()
            Auth.me()
            .then((user) => {
                if(result.data.comingIds.includes(user._id))
                {this.setState({isGoing: true})}
                if(result.data.organizerId === user._id)
                {this.setState({isMyEvent: true})}
                console.log("event -     state", this.state)
            }).catch((err) => {
                
            });
            // if(req.session.currentUser)
            // console.log("can I continue?");
            
    }).catch((err) => { 
    });
}
        leaveEvent=()=>{
        Event.leave(this.props.match.params.eventId)
        .then((result) => {
        this.setState({isGoing: false , event: result.data})
        this.forceUpdate()
        console.log("leave event", result)
        }).catch((err) => {
        console.log(err);
        });
        }

        joinEvent=()=>{
            Event.join(this.props.match.params.eventId)
            .then((result) => {
            this.setState({isGoing: true, event: result.data})
            console.log("join event", result)
            this.forceUpdate()
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

    componentDidMount(){
        this.getOneEvent(this.props.match.params.eventId)

    }
    render() {
        const {event, coming} = this.state;
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
                    <div>
                    <h1>realted to:</h1> 
                    <Link to={`/concertDetail/${event.relatedConcert.id}`}><h2>{event.relatedConcert.name}</h2></Link>
                    </div>
                    :
                    null
                }
                {
                    coming ? (
                        <div className="coming">
                        <h2>Who is coming?</h2>
                        <ul>
                        {coming.map(user => (
                            <li key={user.data._id}>
                                <Link to={`/profile/${user.data._id}`} key={user.data._id}> {user.data.username} </Link>
                            </li>)
                        )}
                        </ul>
                        </div>
                    )
                    :
                    null
                }
                
                {
                        <button onClick={ () => this.props.history.goBack()}>back</button>
                }
                </div>
                :
                <h1>loading</h1>
            } 
            </div>
        )
    }
}
