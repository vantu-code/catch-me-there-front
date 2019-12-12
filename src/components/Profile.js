import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'
import Event from '../lib/Event-service'
import Auth from '../lib/auth-service'



export default class Profile extends Component {
    state={
    user: null,
    myProfile: false
    }

    getUser=()=>{
            Auth.me()
            .then((user) => {
                this.setState({user})
                console.log("user", user.username);
    })
    }


    componentDidMount(){
        this.getUser()
    }
    render() {
        const {user} = this.state;
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
            </div>
        )
    }
}
