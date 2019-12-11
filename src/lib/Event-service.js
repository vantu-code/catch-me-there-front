import axios from 'axios';

class Event {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true,
    });
  }

  create(fullObject){
    console.log("in event", fullObject);
    return this.auth
    .post('/events', fullObject)
    .then(({data})=>console.log(data))
  }

}
const eventService = new Event();

export default eventService;