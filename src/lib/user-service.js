import axios from 'axios';

class User {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
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
  addAttending(UserId){
}

    getOneUser(userId){
    return this.auth
    .get(`/user/${userId}`)
    .then((data)=> data)
  }

}
const userService = new User();

export default userService;