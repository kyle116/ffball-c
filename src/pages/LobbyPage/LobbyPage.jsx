import React, { Component } from 'react';
// Services
import lobbyService from '../../services/lobbyService';
// Components
import Team from '../../components/Team/Team';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
// Stylesheets
import './LobbyPage.css';

class LobbyPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser ? this.props.currentUser : null,
			// currentUser: this.props.currentUser
			lobby: null,
			teams: [],
			recentlyDeleted: null,
			flashMessage: { display: false, message: '' }
		}
	    this.getLobby = this.getLobby.bind(this);
	    this.joinLobby = this.joinLobby.bind(this);
	    this.deleteLobby = this.deleteLobby.bind(this);
	    this.createPlayersList = this.createPlayersList.bind(this);
	    this.flashMessageToggle = this.flashMessageToggle.bind(this);
	}
	componentWillMount() {
		this.getLobby(this.props.match.params.lobbyId);
		for (var i = 0; i < this.state.teams.length; i++) {
			this.state.teams[i].user
		}
	}

	getLobby(lobbyId) {
		console.log(this.state.currentUser)
		lobbyService.findLobbyById(lobbyId, this.state.currentUser).then(response => {
			console.log('response', response)
			this.setState({
				lobby: response.lobby,
				teams: response.lobby.teams,
				currentUserJoined: response.currentUserJoined
			})
		})
	}

	joinLobby(lobbyId) {
		lobbyService.joinLobby(lobbyId, this.state.currentUser, this.state.lobby)
		.then(team => {
			console.log(team)
			this.setState({
				currentTeam: team
			})
		})
	}

	deleteLobby(lobbyId) {
		lobbyService.deleteLobby(lobbyId).then(recentlyDeleted => {
			this.setState({
				lobby: null,
				recentlyDeleted: recentlyDeleted
			});
			this.props.history.push('/lobbies');
		});
	}

	createPlayersList() {
		var players = [];
		for (var i = 0; i < this.state.lobby.list.players.length; i++) {
			players.push(<div key={this.state.lobby.list.players[i]._id}>{this.state.lobby.list.players[i].firstName + ' ' + this.state.lobby.list.players[i].lastName}</div>);
		}
		return players;
	}

	flashMessageToggle(message = '') {
		var flashMessage = {...this.state.flashMessage};
		flashMessage.display = !flashMessage.display;
		flashMessage.message = message;
		this.setState({flashMessage});
		if(message) console.error(message);
	}

	render() {
		return (
			<div>
				{this.state.flashMessage.display &&
				<FlashMessage duration={3000} persistOnHover={true} flashMessageToggle={this.flashMessageToggle} type="error">
				  <strong>{this.state.flashMessage.message}</strong>
				</FlashMessage>
				}
				<div>You are in Lobby: </div>
				{this.state.lobby &&
				<div>
					<div>
						<div>{this.state.lobby.name}</div>
						<button onClick={() => this.deleteLobby(this.state.lobby._id)}>Delete this Lobby</button>
						{!this.state.currentUserJoined && <button onClick={() => this.joinLobby(this.state.lobby._id)}>Join this Lobby</button>}
					</div>
					<div className="column-container">
						<div className="column-2">
						{
							this.state.teams.map((team) => {
								return <Team key={team._id} currentUser={this.state.currentUser} currentLobby={this.state.lobby} team={team}/>
							})
						}
						</div>
						<div className="column-2">
							{this.createPlayersList()}
						</div>
					</div>
				</div>
				}
			</div>
		);
	}
}

export default LobbyPage;
