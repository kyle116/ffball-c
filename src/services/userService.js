import axios from 'axios';

class UserService {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {}
    });
  }

  testFunction() {
    return this.request({method: 'GET', url: '/api/lobbies'})
      .then((response) => console.log(response.data));
  }
}

export default new UserService();
