import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
// Pages
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import Modal from '../../components/Modal/Modal';
// Services
import lobbyService from '../../services/lobbyService';
// Contexts
import { CurrentUserConsumer } from '../../contexts/CurrentUserContext';
// Stylesheets
import './LandingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			modal: {
				SignupPage: false,
				LoginPage: false
			}
		}
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	showModal(page) {
		var modalState = {...this.state.modal};

		if(page === 'SignupPage') {
			modalState.SignupPage = true;
		} else if(page === 'LoginPage') {
			modalState.LoginPage = true;
		}
		this.setState({ modal: modalState });
	}

	hideModal(page) {
		var modalState = {...this.state.modal};

		if(page === 'SignupPage') {
			modalState.SignupPage = false;
		} else if(page === 'LoginPage') {
			modalState.LoginPage = false;
		}
		this.setState({ modal: modalState });
	}

	render() {
		return (
			this.state.currentUser ? 
				(<div>
					{console.log('this.state', this.state.currentUser)}
					<h1>Welcome {this.state.currentUser.firstName + " " + this.state.currentUser.lastName}</h1>
					<Link to={'/lobbies'}>Go to lobbies</Link>
				</div>) 
			:
				(<div>
					{console.log('this.state', this.state.currentUser)}
					<h1>Welcome</h1>
					<button type="button" onClick={() => this.showModal('SignupPage')}>Sign Up Pop Up</button>
					<Link to={'/signup'}>Sign Up Link</Link>
					<Link to={'/login'}>Login Link</Link>
					<button type="button" onClick={() => this.showModal('LoginPage')}>Login Pop Up</button>
	        		
	        		<Modal show={this.state.modal.SignupPage} handleClose={() => this.hideModal('SignupPage')}>
						<SignupPage></SignupPage>
					</Modal>
					<Modal show={this.state.modal.LoginPage} handleClose={() => this.hideModal('LoginPage')}>
						<LoginPage></LoginPage>
					</Modal>
				</div>)
		);
	}
}

export default LandingPage;
