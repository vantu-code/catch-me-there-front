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
      currentCity: null,
      loading: false,
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
    axios
    .get
    (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=${process.env.REACT_APP_GOOGLEKEY}`)
    .then((result) => {
      const currentCity = result.data.results[0].address_components[2].long_name
      if (currentCity)
      {
        this.setState({currentCity})
      }
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
  this.setState({loading:true})
  this.setState({city: this.state.currentCity})
  this.getAllConcerts(this.state.currentCity)
}

  getAllConcerts=(city, countryCode)=>{
    axios
    .get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=&city=${city}&date,desc&size=150&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y`)
    .then((result) => {
        this.filterConcerts(result.data._embedded.events);
        this.setState({cloading:false})
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

    let unique = [...fromDBCopy];

    for (let i = 0; i < unique.length; i++){
        for(let j = i+1; j < unique.length; j++){
            if (unique[i].name === unique[j].name){
                unique.splice(j,1)
                j--;
            }
        }
    }
    this.setState({concerts: unique, loading: false})
  }

  
  componentDidMount() {
//   this.getAllConcerts();
this.findLocation()
  

  }
  componentDidUpdate(){

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading:true})
    const {city, countryCode} = this.state;
    this.getAllConcerts(city, countryCode);
  };

  handleInput = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const {concerts, currentCity, loading} = this.state;
    const {filterConcerts} = this.state;
    return (
 <Wrapper>
 {
    <form className="form-search" className="main-form" onSubmit={this.handleSubmit}>
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
   <MyButton second onClick={this.byMyLocation} className="my-location" >My location</MyButton>
   :
   <img style={{marginTop: "10px"}} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/09b24e31234507.564a1d23c07b4.gif" width="50"/>
 }
 {
        loading?
         <div >
         <img style={{marginTop: "10px",margin: "0 auto", width: "50%"}} src="https://royalsocietypublishing.org/ux3/widgets/publication-content/images/spinner.gif" width="50"/>
         </div>
         :
         null
 }
    {    
      concerts.map((concert, i)=>{
           return (
          <Link to={`/concertDetail/${concert.id}`} style={{textDecoration:"none"}} key={concert.id}>
           <ConcertStyle key={i}>
           <div>
           <h1>{concert.name}</h1>
           <h1>{concert._embedded.venues[0].name}</h1>
            <h2>{concert.dates.start.localDate}</h2> 
           </div>
           <div>
            <img src={concert.images[1].url} height={80}/> 
           </div>
           </ConcertStyle>
           </Link>
           )
         })
       } 

      </Wrapper>
    );
  }
}

export default Concerts;
