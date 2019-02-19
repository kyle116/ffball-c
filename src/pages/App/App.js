import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
// Pages
import LandingPage from '../LandingPage/LandingPage';
import LobbiesPage from '../LobbiesPage/LobbiesPage';
import SignupPage from '../SignupPage/SignupPage';
// Stylesheets
import './App.css';

class App extends Component {
	render() {
	return (
	<Router>
		<div className="App">
			<Route exact path='/' component={LandingPage} />
			<Route exact path='/lobbies' component={LobbiesPage} />
			<Route exact path='/signup' component={SignupPage} />
		</div>
	</Router>
	);
	}
}

export default App;
