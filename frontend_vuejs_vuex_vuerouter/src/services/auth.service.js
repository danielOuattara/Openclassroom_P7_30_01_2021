/*
Authentication service
----------------------

The service provides three important methods with the help of 
axios for HTTP requests & reponses:

    login(): POST {username, password} & save JWT to Local Storage
    logout(): remove JWT from Local Storage
    register(): POST {username, email, password}

*/


import axios from 'axios';

const API_URL = 'http://localhost:4100/api/users/';

class AuthService {
  
  login(user) {
    return axios.post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signin', {
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
