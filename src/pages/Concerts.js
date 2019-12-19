import axios from 'axios'
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import styled, {ThemeProvider} from 'styled-components'
import ConcertStyle from '../StyledComponents/ConcertStyle'
import Wrapper from '../StyledComponents/Wrapper'
import InputLine from '../StyledComponents/InputLine'
import {MyButton} from '../StyledComponents/Button'

class Concerts extends Component {
  constructor() {
    super();
    this.state = { 
      concerts: [],
      filteredConcerts: [],
      city: "",
      countryCode: '',
      currentCity: null
     };
  }

  findLocation=()=>{
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  const success=pos=>{
    var crd = pos.coords;
    //console.log('Your current position is:');
    //console.log(`Latitude : ${crd.latitude}`);
    //console.log(`Longitude: ${crd.longitude}`);
    //console.log(`More or less ${crd.accuracy} meters.`);
    axios
    .get
    (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=${process.env.REACT_APP_GOOGLEKEY}`)
    .then((result) => {
      //console.log("from google, my city is: ", result)
      const currentCity = result.data.results[0].address_components[2].long_name
      if (currentCity)
      {
        //console.log("from google, my city is: ", currentCity)
        this.setState({currentCity})
        // console.log("state", this.state)
      }
      // console.log("from google coor", result.data.results[0].address_components[2].long_name)
    }).catch((err) => {
      console.log(err)
    });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}


byMyLocation=()=>{
  this.getAllConcerts(this.state.currentCity)
  this.setState({city: this.state.currentCity})
}

  getAllConcerts=(city, countryCode)=>{
    axios
    .get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=&city=${city}&date,desc&size=150&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y`)
    .then((result) => {
        this.filterConcerts(result.data._embedded.events);
    //   this.setState({concerts: result.data._embedded.events})
    }).catch((err) => {
      console.log(err)
    });
  }

  filterConcerts=fromDB=>{
    var newArr = []
    const fromDBCopy = [...fromDB]
    fromDBCopy.forEach((oneObj, index)=>{
    for (let i = 0; i < oneObj.name.length; i++ ){
        if (oneObj.name[i] === "-" || oneObj.name[i] === "|" || oneObj.name[i] === ":"){
            if (oneObj.name[i-1] === " ") {
                if (oneObj.name[i-2] === " ") oneObj.name = oneObj.name.substring(0, i-2)
                else oneObj.name = oneObj.name.substring(0, i-1)
            }
            else oneObj.name = oneObj.name.substring(0, i)
        return
        }
      }
    })
    // const filteredConcerts = [...this.state.filteredConcerts]

    let unique = [...fromDBCopy];

    for (let i = 0; i < unique.length; i++){
        for(let j = i+1; j < unique.length; j++){
            if (unique[i].name === unique[j].name){
                unique.splice(j,1)
                j--;
            }
        }
    }
    this.setState({concerts: unique})
    // console.log("uuun", unique);
  }

  
  componentDidMount() {
//   this.getAllConcerts();
this.findLocation()
  

  }
  componentDidUpdate(){

  }

  handleSubmit = e => {
    e.preventDefault();
    // console.dir(e.target);
    const {city, countryCode} = this.state;
    this.getAllConcerts(city, countryCode);
  };

  handleInput = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const {concerts, currentCity} = this.state;
    const {filterConcerts} = this.state;
    return (
 <Wrapper>
 {
    <form className="form-search" onSubmit={this.handleSubmit}>
    <br></br>
    <label>City</label>

     <InputLine 
     onChange={this.handleInput} 
     type="text" 
     name="city" 
     value={this.state.city} />
     <MyButton small>Search</MyButton>
     </form>
 }
 {
   currentCity?
   <MyButton second onClick={this.byMyLocation}>My location</MyButton>
   :
   <img style={{marginTop: "10px"}} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/09b24e31234507.564a1d23c07b4.gif" width="50"/>
 }
    {    concerts.map((concert)=>{
           return (
           <ConcertStyle key={concert.id}>
           <div>
           <Link to={`/concertDetail/${concert.id}`} > <h1>{concert.name}</h1></Link>
           <Link to={`/concertDetail/${concert.id}`} ><h1>{concert._embedded.venues[0].name}</h1></Link>
           <Link to={`/concertDetail/${concert.id}`} > <h2>{concert.dates.start.localDate}</h2> </Link>
           </div>
           <div>
           <Link to={`/concertDetail/${concert.id}`} > <img src={concert.images[1].url} height={80}/> </Link>
           </div>
           </ConcertStyle>
           )
         })
       } 
      </Wrapper>
    );
  }
}

export default Concerts;
