import React, { Component } from 'react'
import axios from 'axios'
import { directive } from '@babel/types';
import {Link} from 'react-router-dom'
import Spotify from '../lib/spotify-service'
import Iframe from 'react-iframe'
import {MyButton} from '../StyledComponents/Button'
import Wrapper from '../StyledComponents/Wrapper'


import {ConcertDetailStyle} from '../StyledComponents/ConcertDetailStyle'


export default class ConcertDetail extends Component {
    state={
    concert: null,
    spotifyLink: '',
    tracks: [],
    relatedEvents: [],
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
            Spotify.getTop(artistName)
            .then((result) => {
                this.setState({
                    spotifyLink: result.data.body.tracks[0].artists[0].external_urls.spotify,
                    tracks: result.data.body.tracks
                })
            }).catch((err) => {
                console.log("error", err)
            });
        }

        getAllEventsAndFindRelated=()=>{
            axios
            .get(`${process.env.REACT_APP_API_URL}/events`, { withCredentials: true})
            .then((result) => {
                const thisConcertId = this.props.match.params.concertId
                const allEvents = [...result.data]
                const relatedEvents = []
                allEvents.forEach((event)=>{
                    if(event.concertId){
                        if (event.concertId === thisConcertId)
                        {relatedEvents.push(event)}
                    }
                })
                this.setState({relatedEvents:relatedEvents})
            }).catch((err) => {
            
            });
        }

    getOneConcert(){
        axios
        .get(`https://app.ticketmaster.com/discovery/v2/events.json?id=${this.props.match.params.concertId}&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y`)
        .then((result) => {
            const goodNameConcert = result.data._embedded.events[0]
            goodNameConcert.name= this.goodNameFunc(goodNameConcert.name)
            this.setState({concert: result.data._embedded.events[0]})
            this.getTopSongs(goodNameConcert.name)
            this.getAllEventsAndFindRelated()
        }).catch((err) => {
        });
    }
    componentDidMount(){
    this.getOneConcert()

    }

    render() {
        const {concert,tracks, relatedEvents} = this.state;
        return (
            <ConcertDetailStyle>
            {
                concert != null ? 
                <div >
                <div className="concert-head">
                <div className="text-wrapper">
                    <h1 className="artistName">{concert.name}</h1>
                    <div className="two-columns">
                        <div>
                            <h2>{concert.dates.start.localDate}</h2>
                            <h2>{concert.dates.start.localTime}</h2>
                            <h2>{concert._embedded.venues[0].address.line1}</h2>
                        </div>
                        <div>
                            <h2>{concert._embedded.venues[0].name}</h2>
                            <h2>{concert._embedded.venues[0].city.name}</h2>
                            <h2>{concert._embedded.venues[0].country.name}</h2>
                        </div>
                    </div>
                </div>
                <div>
                <img style={{margin: "15px 0"}} className="in-concert-image" src={concert.images[0].url} />
                </div>
                </div>
                <article className="links-out">
                    <a href={this.state.spotifyLink}><img src="https://i1.wp.com/davan.ac/wp-content/uploads/2006/07/listen-on-spotify-logo.png?ssl=1" width="80"/> </a>
                    <a href={concert.url}><img src="https://www.trzcacak.rs/myfile/full/345-3451475_buy-at-ticketmaster-logos-ticketmaster.png" width="80"/> </a>
                </article>
                <Link to={`/addEvents/${this.props.match.params.concertId}`} ><MyButton blue >Create related hangout</MyButton></Link>
                {
                tracks.map((track)=>{
                    if(track.preview_url)
                    return <figure key={track.id}>
                    <figcaption className="song-title" >{track.name}</figcaption>
                    <audio className="player"
                    controls
                    src={track.preview_url}>
                    Your browser does not support the
                    <code>audio</code> element.
                    </audio>
                    </figure>
                })
                }
                {
                <Iframe url={`https://www.google.com/maps/embed/v1/search?key=${process.env.REACT_APP_GOOGLEKEY}&q=${concert._embedded.venues[0].address.line1}+${concert._embedded.venues[0].city.name}`}
                    width="100%vw"
                    height="300px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
                }
                {
                relatedEvents.length>0?
                    (<div>
                        <h2 style={{marginTop:"10px"}}>Related hangouts:</h2>
                        {relatedEvents.map((relatedEvent)=>{
                        return <div key={relatedEvent._id} ><Link to={`/eventDetail/${relatedEvent._id}`} ><h1 style={{margin: "10px 0", textDecoration: "underline"}}>{relatedEvent.title}</h1></Link></div>
                        })}
                    </div>)
                :
                    null
                }
                </div>
                :
                <h1>loading</h1>
            } 
                {
                        <MyButton black onClick={ () => this.props.history.goBack()}>back</MyButton>
                    }
            </ConcertDetailStyle>
        )
    }
}
