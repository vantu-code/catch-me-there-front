import axios from 'axios'
import React, { Component } from 'react';

class Concerts extends Component {
  constructor() {
    super();
    this.state = { 
      concerts: [],
      filteredConcerts: [],
     };
  }

  getAllConcerts=()=>{
    axios
    .get("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=barcelona&size=50&apikey=Y4MH0iVp8WoFqZ4aSc3RFUk6DjJl4K1y")
    .then((result) => {
        this.filterConcerts(result.data._embedded.events);
      this.setState({concerts: result.data._embedded.events})
    }).catch((err) => {
      console.log(err)
    });
  }

  filterConcerts=fromDB=>{
    var newArr = []
    const fromDBCopy = [...fromDB]
    fromDBCopy.forEach((oneObj, index)=>{
    for (let i = 0; i < oneObj.name.length; i++ ){
        if (oneObj.name[i] === "-"){
            oneObj.name = oneObj.name.substring(0, i-1)
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
    console.log("uuun", unique);
  }

  
  componentDidMount() {
  this.getAllConcerts();
  

  }
  componentDidUpdate(){

  }
  render() {
    const {concerts} = this.state;
    return (
 <div>
    {    concerts.map((concert)=>{
           return (
           <div key={concert.id}>
           <h1>{concert.name}</h1>
           <img src={concert.images[1].url} height={150}/>
           </div>
           )
         })
       } 
      </div>
    );
  }
}

export default Concerts;
