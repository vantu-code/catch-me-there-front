import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import paintingService from '../lib/paintingService'

class Signup extends Component {
  state = { 
    username: '', 
    password: '',
    photo: '',
  };



  fileChange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)
    paintingService.imageUpload(uploadData)
    .then((image) => {
      console.log("image", image)
        this.setState({ photo: image })
    })
    .catch((error) => console.log(error))
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log("this state of sign up", this.state)
    const { username, password, photo } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup(this.state); // props.signup is Provided by withAuth() and Context API

  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, photo} = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <input
          className="add-input"
          type="file"
          name="image"
          onChange={e => this.fileChange(e)}
          />

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
