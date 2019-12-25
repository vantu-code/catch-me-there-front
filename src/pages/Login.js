import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import InputLine from '../StyledComponents/InputLine'
import {Link} from 'react-router-dom'
import { MyButton } from '../StyledComponents/Button';

class Login extends Component {
  state = { username: '', password: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <img src='/images/catch-me-there-logo-white.png' className="title-login" height="25" style={{marginTop: "20px"}} />
        <h1>Login</h1>
        <form className="login" onSubmit={this.handleFormSubmit}>
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
          <button ><input type="submit" value="Login" className="login-btn"/></button>
        </form>

        <p >Don't have an account?</p>
        <Link style={{textDecoration: "none", display: "inline"}} to={'/signup'} className="log-sign">Signup</Link>

      </div>
    );
  }
}

export default withAuth(Login);
