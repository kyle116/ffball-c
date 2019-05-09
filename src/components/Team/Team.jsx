import React, { Component } from 'react';
// Services
import lobbyService from '../../services/lobbyService';
// Components
import FlashMessage from '../../components/FlashMessage/FlashMessage';
// Stylesheets
import './Team.css';

class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser ? this.props.currentUser : null,
			currentLobby: this.props.currentLobby ? this.props.currentLobby : null
		}
	    // this.getLobby = this.getLobby.bind(this);
	}
	
	render() {
		return (
			<div>
				<div>{`${this.state.currentUser.firstName} ${this.state.currentUser.lastName}`} Team:</div>
				{
					this.state.currentLobby.teams.map((team) => {
						console.log(team, this.state.currentLobby.teams)
					})
				}
			</div>
		)
	}
}

export default Team;