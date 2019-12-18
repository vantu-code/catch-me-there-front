import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'
import Event from '../lib/Event-service'
import Auth from '../lib/auth-service'
import User from '../lib/user-service'
import {MyButton} from '../StyledComponents/Button'
import ListItem from '../StyledComponents/ListItem'
import Wrapper from '../StyledComponents/Wrapper'


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
            componentDidUpdate(prevprops){
                console.log("yooooooooo");
                if(prevprops.match.params.userId !== this.props.match.params.userId){
                    
                this.getUser()
            }
            }
    render() {
        const {user, myProfile, eventsAttending, eventsOrganizing} = this.state;
        console.log(this.state);
        
        return (
            <Wrapper>
            {
            user != null?
            <div>
            <h1 style={{margin: "10px 0", fontSize: "1.2em",
                    textShadow: "3px 3px 8px black",
                    padding: "15px 5px",
                    borderRadius: "5px",
                    width: "fit-content",
                    margin: "0 auto"}}>{user.username}</h1>
            <img className="profile-photo" src={user.photo} width="50"/>
            <h2>{user.email}</h2>
            <h2>{user.about}</h2>
            </div>
            :
            null
            }
            {
                eventsAttending != null ? (
                        <div className="event-attending">
                        <h2 style={{marginTop: "10px", fontSize: "0.9em", borderTop: "1px dashed gray"}}>Attending</h2>
                        <ul style={{width: "100%", padding: "0"}}>
                        {eventsAttending.map(event => (
                            <ListItem key={event.data._id} style={{width: "100%", margin: 0, border: "none"}}>
                            {/* <h1>{event.data.title}</h1> */}
                                <Link to={`/eventDetail/${event.data._id}`} style={{color: "white", textDecoration: "none", fontSize: "0.8em", border: "none"}}> {event.data.title} </Link>
                            </ListItem>)
                        )}
                        </ul>
                        </div>
                    )
                    :
                    null
            }
            {
                eventsOrganizing !== null ? (
                        <div className="event-organizing">
                        <h2 style={{marginTop: "10px", fontSize: "0.9em", borderTop: "1px dashed gray"}} >Organizing</h2>
                        <ul style={{width: "100%", padding: "0", fontSize: "0.7em"}}>
                        {eventsOrganizing.map(event => (
                            <ListItem key={event.data._id} >
                            {/* <h1>{event.data.title}</h1> */}
                                <Link to={`/eventDetail/${event.data._id}`} style={{color: "white", textDecoration: "none", border: "none", fontSize: "0.8em"}}> {event.data.title} </Link>
                            </ListItem>)
                        )}
                        </ul>
                        </div>
                    )
                    :
                    null
            }
            {/* {
            myProfile?
            <MyButton blue>Edit profile</MyButton>
            :
            null
            } */}
            {
                        <MyButton black onClick={ () => this.props.history.goBack()}>back</MyButton>
            }
            </Wrapper>
        )
    }
}
