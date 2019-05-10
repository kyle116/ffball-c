import React, { Component } from 'react';
import { bool } from 'prop-types';
// Services
import userService from '../../services/userService';
// Components
import FlashMessage from '../../components/FlashMessage/FlashMessage';
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
		  },
		  flashMessage: { 
		  	display: false, 
		  	message: '' 
		  }
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.flashMessageToggle = this.flashMessageToggle.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.setCurrentUser = this.setCurrentUser.bind(this);
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
		if(!this.validateEmail(signupData.email)) return;
		var loginCredentials = {};
		try {
		  const createUser = await userService.createUser(signupData);
		  loginCredentials = {
		    email: createUser.email,
		    password: this.state.signupData.password
		  }
		} catch(error) {
		  console.error(error);
		}

		if(!loginCredentials.hasOwnProperty('email') || !loginCredentials.hasOwnProperty('password')) return console.error('User signup failed');

		try {
		  const loginUser = await userService.loginUser(loginCredentials);
		  // Login, sets current user to state, then sets App.js state with currentUser to use globally as props
	      this.setState({
	        currentUser: loginUser
	      }, this.setCurrentUser);
		  this.props.history.push('/lobbies');
		} catch(error) {
		  console.error(error);
		}
	}

	setCurrentUser() {
		this.props.setCurrentUser(this.state.currentUser);
	}

	validateEmail(email) {
		if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
			this.flashMessageToggle('Invalid email format. Please enter a valid email');
			return false;
		}
		return true;
	}

	flashMessageToggle(message = '') {
		var flashMessage = {...this.state.flashMessage};
		flashMessage.display = !flashMessage.display;
		flashMessage.message = message;
		this.setState({flashMessage});
		if(message) console.error(message);
	}

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        {this.state.flashMessage.display &&
        <FlashMessage duration={3000} persistOnHover={true} flashMessageToggle={this.flashMessageToggle} type="error">
			<strong>{this.state.flashMessage.message}</strong>
		</FlashMessage>
		}
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
          <button>Create User</button>
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
