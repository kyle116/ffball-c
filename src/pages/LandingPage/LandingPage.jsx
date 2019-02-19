import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
// Pages
import SignupPage from '../SignupPage/SignupPage';
import Modal from '../../components/Modal/Modal';
// Services
import lobbyService from '../../services/lobbyService';
// Stylesheets
import './LandingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: '',
			show: false
		}
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

	render() {
		return (
			<div>
				<h1>Welcome</h1>
				<button type="button" onClick={this.showModal}>Sign Up Pop Up</button>
				<Link to={'/signup'}>Sign Up Link</Link>
        <Modal show={this.state.show} handleClose={this.hideModal}>
					<SignupPage></SignupPage>
				</Modal>
			</div>
		);
	}
}

export default LandingPage;
