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
    }

    getUser=()=>{
        if(this.props.match.params.userId){
        User.getOneUser(this.props.match.params.userId)
        .then((user) => {
            console.log("in get one user", user)
            this.setState({user: user.data})
            this.eventsAttending()
        }).catch((err)=>{
            console.log(err)
        })
        }
        else{
            Auth.me()
            .then((user) => {
                this.setState({user, myProfile:true})
                this.eventsAttending()
                console.log("user", user.username);
            }).catch((err)=>{
                console.log(err)
            })
        }
        }

        eventsAttending=()=>{
            console.log("this state event", this.state.event)
            const {attending} = this.state.user
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

    componentDidMount(){
        this.getUser()
    }
    render() {
        const {user, myProfile} = this.state;
        console.log(this.state);
        
        return (
            <div>
            {
            user === null ?
            <div>
            <h1>Check</h1>
            </div>
            :
            <div>
            <h1>{user.username}</h1>
            <img src={user.photo}/>
            </div>
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
