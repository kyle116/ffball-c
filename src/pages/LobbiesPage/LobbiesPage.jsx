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
      lobbyName: '',
      errorMessage: null
		}
    this.getLobbies = this.getLobbies.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateLobby = this.validateLobby.bind(this);
    this.createLobby = this.createLobby.bind(this);
    this.deleteLobby = this.deleteLobby.bind(this);
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

  validateLobby() {
    const lobbyName = this.state.lobbyName;
    if(lobbyName === '') {
      this.setState({
        errorMessage: 'Lobby name cannot be blank'
      }, () => console.error(this.state.errorMessage));
      return false;
    }
    for (var i = 0; i < this.state.lobbies.length; i++) {
      if(this.state.lobbies[i].name === lobbyName) {
        this.setState({
          errorMessage: 'Duplicate lobby name, lobby names must be unique'
        }, () => console.error(this.state.errorMessage));
        return false;
      }
    }
    return true;
  }

	createLobby(e) {
    e.preventDefault();
    const lobbyName = this.state.lobbyName;
    if(!this.validateLobby()) return;
    // this.validateLobby.bind(this);
    // lobbyService.findLobby(lobbyName).then(lobby => {
    //   // console.log(lobby, lobby, lobbyName);
    //   // if(lobby.length > 0) return console.error('Duplicate name');
    //   lobbyService.createLobby(lobbyName).then(lobby => {
    //     var newLobbies = this.state.lobbies.concat(lobby);
    //     this.setState({
    //       lobbies: newLobbies,
    //       lobbyName: '' // clears inputs after submit
    //     });
    //   })
    //   .catch(error => console.log(error.response));
    // });
    lobbyService.createLobby(lobbyName).then(lobby => {
      var newLobbies = this.state.lobbies.concat(lobby);
      this.setState({
        lobbies: newLobbies,
        lobbyName: '' // clears inputs after submit
      });
    })
    .catch(error => console.log(error.response));

    // disabled={!this.state.lobbies}
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
      });
    });
	}

	render() {
		return (
			<div>
        <form onSubmit={this.createLobby}>
          <label>
            Lobby Name:&nbsp;
            <input
              placeholder="Enter a Name"
              name="lobbyName"
              ref="lobbyName"
              value={this.state.lobbyName}
              onChange={this.onChange}
            />
          </label>
          <button>Create Lobby</button>
        </form>
        {this.state.lobbies ?
          this.state.lobbies.map((lobby, index) =>
            <LobbyModal key={lobby._id} lobby={lobby} deleteLobby={this.deleteLobby}></LobbyModal>
          )
          :
          <div>No Lobbies Found</div>
        }
			</div>
		);
	}
}

export default LobbiesPage;
