import React, { Component } from 'react';
import lobbyService from '../../services/lobbyService'

import './LandingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: ''
		}
	}

	testFunction() {
		lobbyService.testFunction();
	}

	render() {
		return (
			<div>
				<h1>Welcome</h1>
				<button onClick={this.testFunction}>Click</button>
			</div>
		);
	}
}

export default LandingPage;
