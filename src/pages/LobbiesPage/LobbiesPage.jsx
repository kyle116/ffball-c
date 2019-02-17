import React, { Component } from 'react';
import lobbyService from '../../services/lobbyService'
import LobbyModal from '../../components/LobbyModal/LobbyModal'

import './LobbiesPage.css';

class LobbiesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
      lobbies: null,
      recentlyDeleted: null,
      lobbyName: ''
		}
	}
  componentDidMount() {
    this.getLobbies();
  }

  getLobbies() {
    lobbyService.getLobbies().then(lobbies => {
      this.setState({
        lobbies: lobbies
      });
    });
  }

  onChange(e) {
    this.setState({
      lobbyName: e.target.value
    });
  }

	createLobby(e) {
    e.preventDefault();
    const lobbyName = this.state.lobbyName;
    lobbyService.createLobby(lobbyName).then(lobby => {
      var newLobbies = this.state.lobbies.concat(lobby);
      this.setState({
        lobbies: newLobbies,
        lobbyName: '' // clears inputs after submit
      });
    })
	}

  deleteLobby(lobbyId) {
    lobbyService.deleteLobby(lobbyId).then(recentlyDeleted => {
      var updatedLobbies = this.state.lobbies;
      for (var i = 0; i < updatedLobbies.length; i++) {
        if(updatedLobbies[i]._id === lobbyId) {
          updatedLobbies.splice(i, 1);
        }
      }
      this.setState({
        lobbies: updatedLobbies,
        recentlyDeleted: recentlyDeleted
      })
    });
	}

	render() {
		return (
			<div>
        <form onSubmit={this.createLobby.bind(this)}>
          <input
            placeholder="Enter a Name"
            name="lobbyName"
            ref="lobbyName"
            value={this.state.lobbyName}
            onChange={this.onChange.bind(this)}
          />
          <button disabled={!this.state.lobbyName}>Create Lobby</button>
        </form>
        {this.state.lobbies ?
          this.state.lobbies.map((lobby, index) =>
            <LobbyModal key={lobby._id} lobby={lobby} deleteLobby={this.deleteLobby.bind(this)}></LobbyModal>
          )
          :
          <div>No Lobbies Found</div>
        }
			</div>
		);
	}
}

export default LobbiesPage;
