import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import paintingService from '../lib/paintingService'
import InputLine from '../StyledComponents/InputLine'
import { MyButton } from '../StyledComponents/Button';
import TextArea from '../StyledComponents/TextArea'

class Signup extends Component {
  state = { 
    username: '', 
    password: '',
    photo: '',
    email: '',
    about: '',
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
    const { username, password, photo, email, about } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup(this.state); // props.signup is Provided by withAuth() and Context API

  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, photo, email, about} = this.state;
    return (
      <div>
        <img src='/images/catch-me-there-logo-white.png' className="title" height="25" style={{marginTop: "20px"}} alt="Catch me there" />
        <h1 >Sign Up</h1>
        <form className="signup" onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <InputLine
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <InputLine
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <label>Email:</label>
          <InputLine
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>About:</label>
          <TextArea rows="4"
            type="text"
            name="about"
            value={about}
            onChange={this.handleChange}
          />

          <InputLine
          style={{marginTop: "30px"}}
          className="add-input"
          type="file"
          name="image"
          onChange={e => this.fileChange(e)}
          />

          <MyButton login><input type="submit" value="Signup" /></MyButton>
        </form>

        <p style={{width: "100%"}}>Already have an account?</p>
        <Link style={{color: "white", textDecoration: "none", width: "100%"}} to={'/login'}> <MyButton black>Login </MyButton></Link>
      </div>
    );
  }
}

export default withAuth(Signup);
