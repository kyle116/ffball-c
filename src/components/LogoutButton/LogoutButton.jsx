import React, { Component } from 'react';
// Stylesheets
import './LogoutButton.css';

class LogoutButton extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
	}

	logOut() {
	    this.props.history.push('/');
	    this.props.removeCurrentUser();
	}

	render() {
		return(
			<button onClick={this.logOut}>Logout</button>
		)
	}
}

export default LogoutButton;