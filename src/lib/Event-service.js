import axios from 'axios';

class Event {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true,
    });
  }

  create(fullObject){
    return this.auth
    .post('/events', fullObject)
    .then(({data})=>console.log(data))
  }

  getOne(eventId){
    return this.auth
    .get(`/events/${eventId}`)
    .then((data)=> data)
  }

}
const eventService = new Event();

export default eventService;