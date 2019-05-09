import React, { Component } from 'react';
// Services
import lobbyService from '../../services/lobbyService';
import userService from '../../services/userService';
// Components
import FlashMessage from '../../components/FlashMessage/FlashMessage';
// Stylesheets
import './Team.css';

class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser ? this.props.currentUser : null,
			currentLobby: this.props.currentLobby ? this.props.currentLobby : null,
			team: this.props.team,
			user: null
		}
	    // this.getLobby = this.getLobby.bind(this);
	}

	componentWillMount() {
		console.log('this.props', this.props)
		if(this.props.user) {
			userService.findUserById(this.props.user).then(response => {
				console.log('response', response)
				this.setState({
					user: response.user
				})
			});
		}
	}
	
	render() {
		return (
			<div key={this.props.team._id}>
				{this.state.currentUser && <div>Your Team: </div>}
				{this.state.user && <div>{`${this.state.user.firstName} ${this.state.user.lastName}`} Team:</div>}
			</div>
		)
	}
}

export default Team;