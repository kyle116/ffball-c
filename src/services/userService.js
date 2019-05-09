import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
      .then((response) => {
        if(response.data.success) {
          const token = response.data.token
          this.setToken(token)
          return jwtDecode(token);
        } else {
          console.log(response.data);
          return response.data
        }
      });
  }

  findUserById(userId) {
    this.request.defaults.headers.common.token = this.getToken();
    return this.request({method: 'GET', url: `/api/users/${userId}`})
      .then((response) => {
        return response.data
      });
  }

  // JWT functions
  getCurrentUser() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.request.defaults.headers.common.token = token;
    return token;
  }

  clearToken() {
    localStorage.removeItem('token');
    delete this.request.defaults.headers.common.token;
  }
}

export default new UserService();
