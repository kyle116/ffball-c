import React, { Component } from 'react';
import { bool } from 'prop-types';
// services
import userService from '../../services/userService';
// Stylesheets
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
		super(props);
    this.state = {
      modal: this.props.modal,
      signupData: {
        login: '',
        password: ''
      },
      currentUser: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const signupData = this.state.signupData;
    signupData[name] = value;
    console.log(signupData);

    this.setState({signupData});
  }

  async handleSubmit(e) {
    e.preventDefault();
    const signupData = this.state.signupData;
    var loginCredentials;
    loginCredentials = {
      email: this.state.signupData.login.includes('@') ? this.state.signupData.login : '',
      username: !this.state.signupData.login.includes('@') ? this.state.signupData.login : '',
      password: this.state.signupData.password
    }
    console.log(loginCredentials);

    try {
      const loginUser = await userService.loginUser(loginCredentials);
      console.log(loginUser);
      // Login, sets current user to state, then sets App.js state with currentUser to use globally as props
      this.setState({
        currentUser: loginUser
      }, () => this.setCurrentUser());
      this.props.history.push('/lobbies')
    } catch(error) {
      console.log(error);
    }
  }

  setCurrentUser() {
    this.props.setCurrentUser(this.state.currentUser);
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              name="login"
              value={this.state.signupData.login}
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

LoginPage.defaultProps = {
  modal: false
};

LoginPage.propTypes = {
  modal: bool
};

export default LoginPage;
