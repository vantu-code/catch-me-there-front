import axios from 'axios'
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Concerts extends Component {
  constructor() {
    super();
    this.state = { 
      concerts: [],
      filteredConcerts: [],
      city: "",
      countryCode: '',
     };
  }

  getAllConcerts=(city, countryCode)=>{
    axios
    .get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&city=${city}&date,desc&size=150&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y`)
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
    const {concerts} = this.state;
    const {filterConcerts} = this.state;
    return (
 <div>
 {
    <form onSubmit={this.handleSubmit}>
    <label>Country code</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="countryCode" 
     value={this.state.countryCode} />

    <label>City</label>
     <input 
     onChange={this.handleInput} 
     type="text" 
     name="city" 
     value={this.state.city} />
     <button>Search</button>
     </form>
 }
    {    concerts.map((concert)=>{
           return (
           <div key={concert.id}>
           <h1>{concert.name}</h1>
           <h2>{concert.dates.start.localDate}</h2>
           <Link to={`/concertDetail/${concert.id}`} > <img src={concert.images[1].url} height={150}/> </Link>
           </div>
           )
         })
       } 
      </div>
    );
  }
}

export default Concerts;
