import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import InputLine from '../StyledComponents/InputLine'
import {Link} from 'react-router-dom'

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
          <InputLine type="submit" value="Login" />
        </form>
        <p>Don't have an account?</p>
        <Link to={'/signup'}> Signup</Link>
      </div>
    );
  }
}

export default withAuth(Login);
