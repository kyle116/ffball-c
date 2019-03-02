import axios from 'axios';

class LobbyService {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {}
    });
  }

  getLobbies() {
    return this.request({method: 'GET', url: '/api/lobbies'})
      .then((response) => response.data);
  }

  findLobbyById(lobbyId) {
    return this.request({method: 'GET', url: `/api/lobbies/find/${lobbyId}`})
      .then((response) => {
        return response.data
      });
  }

  // Future use for search bar of lobbies
  findLobbyByName(lobbyName) {
    return this.request({method: 'GET', url: `/api/lobbies/find/${lobbyName}`})
      .then((response) => {
        return response.data
      });
  }

  createLobby(lobbyName) {
    return this.request({method: 'POST', url: '/api/lobbies/new', data: {name: lobbyName}})
      .then((response) => response.data.lobby);
  }

  deleteLobby(lobbyId) {
    return this.request({method: 'DELETE', url: `/api/lobbies/${lobbyId}`})
      .then((response) => response.data.lobby);
  }
}

export default new LobbyService();
