import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <h1>Welcome</h1>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/lobbies' component={LobbiesPage} />
      </div>
    </Router>
    );
  }
}

export default App;
