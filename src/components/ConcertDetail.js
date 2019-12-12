import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'
import Spotify from '../lib/spotify-service'


export default class ConcertDetail extends Component {
    state={
    concert: null,
    spotifyLink: '',
    }


    goodNameFunc=name=>{
        for (let i = 0; i < name.length; i++ ){
            if (name[i] === "-" || name[i] === "|" || name[i] === ":"){
                if (name[i-1] === " ") {
                    if (name[i-2] === " ") name = name.substring(0, i-2)
                    else name = name.substring(0, i-1)
                }
                else name = name.substring(0, i)
            return name
            }
          }
          return name
        }


        getTopSongs=(artistName)=>{
            console.log("artist to send,",artistName)
            Spotify.getTop(artistName)
            .then((result) => {
                // console.log("in concert detail", result.data.body.tracks[0].artists[0].external_urls.spotify)
                this.setState({spotifyLink: result.data.body.tracks[0].artists[0].external_urls.spotify})
                console.log(this.state.spotifyLink)
            // this.props.history.push('/events');
            }).catch((err) => {
            });
        }
    getOneConcert(){
        console.log("props", this.props.match.params.concertId)
        axios
        .get(`https://app.ticketmaster.com/discovery/v2/events.json?id=${this.props.match.params.concertId}&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y`)
        .then((result) => {
            //console.log("result", result.data._embedded.events[0], 'hbjhgh')
            const goodNameConcert = result.data._embedded.events[0]
            goodNameConcert.name= this.goodNameFunc(goodNameConcert.name)
            this.setState({concert: result.data._embedded.events[0]})
            this.getTopSongs(goodNameConcert.name)
            console.log("state", this.state.spotifyLink)
        }).catch((err) => {
        });
    }
    componentDidMount(){
    this.getOneConcert()

    }

    render() {
        const {concert} = this.state;
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
                <a href={this.state.spotifyLink}><img src="https://i1.wp.com/davan.ac/wp-content/uploads/2006/07/listen-on-spotify-logo.png?ssl=1" width="80"/> </a>
                <a href={concert.url}><img src="https://www.trzcacak.rs/myfile/full/345-3451475_buy-at-ticketmaster-logos-ticketmaster.png" width="80"/> </a>
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
