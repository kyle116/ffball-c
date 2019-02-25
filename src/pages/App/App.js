import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
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
			currentUser: null
		}
		this.setCurrentUser = this.setCurrentUser.bind(this);
	}

	setCurrentUser(user) {
		this.setState({
			currentUser: user
		})
	}

	render() {
	return (
	<Router>
		<div className="App">
			<Route exact path='/' component={LandingPage} />
			<Route exact path='/lobbies' component={LobbiesPage} />
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
