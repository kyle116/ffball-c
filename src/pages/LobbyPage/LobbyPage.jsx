import React, { Component } from 'react';
// Services
import lobbyService from '../../services/lobbyService';
// Components
import FlashMessage from '../../components/FlashMessage/FlashMessage';
// Stylesheets
import './LobbyPage.css';

class LobbyPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			// currentUser: this.props.currentUser
			lobby: null,
			recentlyDeleted: null,
			flashMessage: { display: false, message: '' }
		}
	    this.getLobby = this.getLobby.bind(this);
	    this.deleteLobby = this.deleteLobby.bind(this);
	    this.createPlayersList = this.createPlayersList.bind(this);
	    this.flashMessageToggle = this.flashMessageToggle.bind(this);
	}
	componentWillMount() {
		this.getLobby(this.props.match.params.lobbyId);
	}

	getLobby(lobbyId) {
		lobbyService.findLobbyById(lobbyId).then(foundLobby => {
			console.log(foundLobby)
			this.setState({
				lobby: foundLobby
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
					<div>{this.state.lobby.name}</div>
					<button onClick={() => this.deleteLobby(this.state.lobby._id)}>Delete this Lobby</button>
					{this.createPlayersList()}
				</div>
				}

				
				
			</div>
		);
	}
}

export default LobbyPage;
