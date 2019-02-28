import React, { Component } from 'react';
// Services
import userService from '../../services/userService';
// Stylesheets
import './LogoutButton.css';

class LogoutButton extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
	}

	logOut() {
	    this.props.removeCurrentUser();
	    this.props.history.push('/');
	}

	render() {
		return(
			<button onClick={this.logOut}>Logout</button>
		)
	}
}

export default LogoutButton;