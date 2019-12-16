import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'
import Event from '../lib/Event-service'
import Auth from '../lib/auth-service'
import User from '../lib/user-service'


export default class Profile extends Component {
    state={
    user: null,
    myProfile: false,
    eventsAttending: null,
    eventsOrganizing: null,
    }

    getUser=()=>{
        const {userId} = this.props.match.params
        User.getOneUser(userId)
        .then((user) => {
            this.setState({user: user.data})
            this.eventsAttending()
            this.eventsOrganizing()
            Auth.me()
            .then((result) => {
                console.log("result from if me",  result)
                if (userId === result._id){
                this.setState({myProfile : true})
                }
            })
            //console.log("in get one user", this.state)
        }).catch((err)=>{
            console.log(err)
        })
        }
        
        eventsOrganizing=()=>{
        const {organizing} = this.state.user
        if (organizing.length > 0){
            const organizingCopy = [...organizing]
            console.log("event id", organizingCopy)
            const promiseArr =[]
            organizing.forEach((id)=>{
            promiseArr.push(Event.getOne(id))
        })
        Promise.all(promiseArr)
        .then((result) => {
            this.setState({eventsOrganizing:result})
                //console.log("this state eventdetail", this.state)
            }).catch((err) => {
                
            });
        }
        }


        eventsAttending=()=>{
            console.log("this state event", this.state.event)
            const {attending} = this.state.user
        if (attending.length > 0){
            const attendingCopy = [...attending]
            console.log("event id", attendingCopy)
            const promiseArr =[]
            attending.forEach((id)=>{
            promiseArr.push(Event.getOne(id))
        })
        Promise.all(promiseArr)
        .then((result) => {
            this.setState({eventsAttending:result})
                //console.log("this state eventdetail", this.state)
            }).catch((err) => {
                
            });
        }
            }

    componentDidMount(){
        this.getUser()
    }
    render() {
        const {user, myProfile, eventsAttending, eventsOrganizing} = this.state;
        console.log(this.state);
        
        return (
            <div>
            {
            user != null?
            <div>
            <h1>{user.username}</h1>
            <img src={user.photo}/>
            </div>
            :
            null
            }
            {
                eventsAttending !=null ? (
                        <div className="event-attending">
                        <h2>Attending</h2>
                        <ul>
                        {eventsAttending.map(event => (
                            <li key={event.data._id}>
                            {/* <h1>{event.data.title}</h1> */}
                                <Link to={`/eventDetail/${event.data._id}`} > {event.data.title} </Link>
                            </li>)
                        )}
                        </ul>
                        </div>
                    )
                    :
                    null
            }
            {
                eventsOrganizing !=null ? (
                        <div className="event-organizing">
                        <h2>Organizing</h2>
                        <ul>
                        {eventsOrganizing.map(event => (
                            <li key={event.data._id}>
                            {/* <h1>{event.data.title}</h1> */}
                                <Link to={`/eventDetail/${event.data._id}`} > {event.data.title} </Link>
                            </li>)
                        )}
                        </ul>
                        </div>
                    )
                    :
                    null
            }
            {
            myProfile?
            <button>Edit profile</button>
            :
            null
            }
            {
                        <button onClick={ () => this.props.history.goBack()}>back</button>
            }
            </div>
        )
    }
}
