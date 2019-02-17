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
