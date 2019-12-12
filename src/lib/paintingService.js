import axios from 'axios';


class Painting {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
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