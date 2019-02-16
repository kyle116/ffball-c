import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import LandingPage from '../LandingPage/LandingPage'
import LobbiesPage from '../LobbiesPage/LobbiesPage'
import './App.css';

class App extends Component {
	render() {
	return (
	<Router>
		<div className="App">
			<Route exact path='/' component={LandingPage} />
			<Route exact path='/lobbies' component={LobbiesPage} />
		</div>
	</Router>
	);
	}
}

export default App;
