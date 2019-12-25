import axios from 'axios';

class Event {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  create(fullObject){
    return this.auth
    .post('/events', fullObject)
    .then(({data})=>data)
  }

  getOne(eventId){
    return this.auth
    .get(`/events/${eventId}`)
    .then((data)=> data)
  }

  delete(eventId){
    return this.auth
    .delete(`/events/delete/${eventId}`)
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