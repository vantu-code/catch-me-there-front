import axios from 'axios';

class User {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

getAll(){
    return this.auth
    .get(`/user/`)
    .then((data)=> data)
}
  addOrganizing(userId){
    
  }
  joinEvent(eventId){
    return this.auth
    .put(`/user/${eventId}`)
    .then((data)=>data)
}
leaveEvent(eventId){
  return this.auth
  .put(`/user/leave/${eventId}`)
  .then((data)=>data)
}


    getOneUser(userId){
    return this.auth
    .get(`/user/${userId}`)
    .then((data)=> data)
  }

}
const userService = new User();

export default userService;