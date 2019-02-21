import React, { Component } from 'react';
import { bool } from 'prop-types';
// services
import userService from '../../services/userService';
// Stylesheets
import './SignupPage.css';

class SignupPage extends Component {
  constructor(props) {
		super(props);
    this.state = {
      modal: this.props.modal,
      signupData: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const signupData = this.state.signupData;
    signupData[name] = value;

    this.setState({signupData});
  }

  async handleSubmit(e) {
    e.preventDefault();
    const signupData = this.state.signupData;
    var loginCredentials;
    try {
      const createUser = await userService.createUser(signupData);
      loginCredentials = {
        email: createUser.email,
        password: this.state.signupData.password
      }
    } catch(error) {
      console.log(error);
    }

    try {
      const loginUser = await userService.loginUser(loginCredentials);
      console.log(loginUser);
      this.props.history.push('/lobbies')
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input
              name="firstName"
              type="text"
              value={this.state.signupData.firstName}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Last Name:
            <input
              name="lastName"
              type="text"
              value={this.state.signupData.lastName}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.signupData.username}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Email:
            <input
              name="email"
              value={this.state.signupData.email}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.signupData.password}
              onChange={this.handleInputChange} />
          </label>
          <button>Create Lobby</button>
        </form>
      </div>
    )
  }
}

SignupPage.defaultProps = {
  modal: false
};

SignupPage.propTypes = {
  modal: bool
};

export default SignupPage;
