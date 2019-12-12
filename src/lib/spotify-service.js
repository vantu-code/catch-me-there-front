import axios from 'axios';

class Spotify {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
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