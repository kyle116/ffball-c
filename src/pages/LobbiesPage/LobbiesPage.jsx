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
      recentlyDeleted: null
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

	createLobby() {
    lobbyService.createLobby().then(lobby => {
      var newLobbies = this.state.lobbies.concat(lobby);
      // var newLobbies = this.state.lobbies;
      // newLobbies.push(lobby);
      this.setState({
        lobbies: newLobbies
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

      // ([
      // <div key={lobby._id}>Lobby: {lobby._id}</div>,
      // <button key={'b' + lobby._id} onClick={this.deleteLobby.bind(this, lobby._id)}>Delete</button>
      // ])

    });
	}

	render() {
		return (
			<div>
				<button onClick={this.createLobby.bind(this)}>Create Lobby</button>
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
