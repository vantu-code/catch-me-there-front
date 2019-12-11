import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'

export default class ConcertDetail extends Component {
    state={
    concert: null,
    }

    
    getOneConcert(){
        console.log("props", this.props.match.params.concertId)
        axios
        .get(`https://app.ticketmaster.com/discovery/v2/events.json?id=${this.props.match.params.concertId}&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y`)
        .then((result) => {
            //console.log("result", result.data._embedded.events[0], 'hbjhgh')
            this.setState({concert: result.data._embedded.events[0]})
            console.log(this.state.concert._embedded.venues[0].address.line1);
        }).catch((err) => {
        });
    }
    componentDidMount(){
    this.getOneConcert()
    }

    render() {
        const {concert} = this.state;
        console.log("state", this.state.concert)
        // console.log('concert.length',concert.length);
        return (
            <div>
            {
                concert != null ? 
                <div>
                <h1>{concert.name}</h1>
                <h2>{concert.dates.start.localDate}</h2>
                <h2>{concert.dates.start.localTime}</h2>
                <h2>{concert._embedded.venues[0].address.line1}</h2>
                <h2>{concert._embedded.venues[0].name}</h2>
                <h2>{concert._embedded.venues[0].city.name}</h2>
                <h2>{concert._embedded.venues[0].country.name}</h2>
                <h2>{concert._embedded.venues[0].location.latitude} latitude</h2>
                <h2>{concert._embedded.venues[0].location.longitude} longitude</h2>
                <a href={concert.url}> <button >Buy tickets</button> </a>
                <Link to={`/addEvents/${this.props.match.params.concertId}`} ><button >Create Group</button></Link>
                {/* latitude: "41.39772"
longitude: "2.19111" */}
                <img src={concert.images[0].url} />
                </div>
                :
                <h1>loading</h1>
            } 
            </div>
        )
    }
}
