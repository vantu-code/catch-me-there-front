import axios from 'axios';

class Spotify {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }


  getTop(artistName){
    return this.auth
    .get(`/spotify/${artistName}`)
    .then((data)=> data)
  }

}
const spotifyService = new Spotify();

export default spotifyService;