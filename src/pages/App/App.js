import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
// Services
import userService from '../../services/userService';
// Pages
import LandingPage from '../LandingPage/LandingPage';
import LobbiesPage from '../LobbiesPage/LobbiesPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
// Stylesheets
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: userService.getCurrentUser()
		}
		this.setCurrentUser = this.setCurrentUser.bind(this);
		this.removeCurrentUser = this.removeCurrentUser.bind(this);
	}

	setCurrentUser(user) {
		this.setState({
			currentUser: user
		});
	}

	removeCurrentUser() {
		userService.clearToken();
		this.setState({
			currentUser: null
		});
	}

	render() {
	return (
	<Router>
		<div className="App">
			<Route exact path='/' component={LandingPage} />
			<Route
				exact path='/lobbies'
				render={(props) => <LobbiesPage {...props} removeCurrentUser={this.removeCurrentUser} />}
			/>
			<Route
				exact path='/signup'
				render={(props) => <SignupPage {...props} setCurrentUser={this.setCurrentUser} />}
			/>
			<Route
				exact path='/login'
				render={(props) => <LoginPage {...props} setCurrentUser={this.setCurrentUser} />}
			/>
		</div>
	</Router>
	);
	}
}

export default App;
