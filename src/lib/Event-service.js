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

  delete(eventId){
    return this.auth
    .get(`/events/delete/${eventId}`)
    .then((data)=> data)
  }

  join(eventId){
    return this.auth
    .put(`/events/${eventId}`)
    .then((data)=> data)
  }
  leave(eventId){
  return this.auth
  .put(`/events/leave/${eventId}`)
  .then((data)=> data)
  }
}
const eventService = new Event();

export default eventService;