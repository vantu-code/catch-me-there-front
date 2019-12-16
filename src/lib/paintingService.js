import axios from 'axios';


class Painting {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

imageUpload(file) {
    console.log(file);
    return this.auth.post("/painting", file).then(({ data }) => {
      return data;
    });
  }

}
const paintingService = new Painting();

export default paintingService;