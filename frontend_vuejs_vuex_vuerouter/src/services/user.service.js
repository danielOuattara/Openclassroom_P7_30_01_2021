import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4100/api/auth/';

class UserService {
  // getPublicContent() {
  //   return axios.get(API_URL + 'all');
  // }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  // getModeratorBoard() {
  //   return axios.get(API_URL + 'mod', { headers: authHeader() });
  // }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();


/*
You can see that we add a HTTP header with the help of
"authHeader()" function when requesting authorized resource.
*/
