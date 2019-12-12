import axios from 'axios';

class User {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true,
    });
  }


  addOrganizing(userId){
  }
  addAttending(UserId){
}

}
const userService = new User();

export default userService;