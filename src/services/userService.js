import axios from 'axios';

class UserService {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {}
    });
  }

  createUser(userData) {
    return this.request({method: 'POST', url: '/api/users/new', data: userData})
      .then((response) => response.data.user);
  }

  loginUser(loginCredentials) {
    return this.request({method: 'POST', url: '/api/users/login', data: loginCredentials})
      .then((response) => response.data);
  }
}

export default new UserService();
