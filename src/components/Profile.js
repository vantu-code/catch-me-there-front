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
    myProfile: false
    }

    getUser=()=>{
        if(this.props.match.params.userId){
        User.getOneUser(this.props.match.params.userId)
        .then((user) => {
            this.setState({user})
        }).catch((err)=>{
            console.log(err)
        })
        }
        else{
            Auth.me()
            .then((user) => {
                this.setState({user, myProfile:true})
                console.log("user", user.username);
            }).catch((err)=>{
                console.log(err)
            })
        }
        }

    componentDidMount(){
        this.getUser()
    }
    render() {
        const {user, myProfile} = this.state;
        return (
            <div>
            {
            user === null ?
            <div>
            <h1>Check</h1>
            </div>
            :
            <h1>{user.username}</h1>
            }
            {
            myProfile?
            <button>Edit profile</button>
            :
            null
            }
            </div>
        )
    }
}
