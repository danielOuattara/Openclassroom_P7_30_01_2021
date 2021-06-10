/* Authentication service
--------------------------

The service provides three important methods with the help of 
axios for HTTP requests & reponses:

    login(): POST { username, password } & save JWT to Local Storage
    logout(): remove JWT from Local Storage
    signin(): POST { email, password }
*/

import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:4200/api/auths/";

class AuthService {

    login(user) {
        return axios.post(API_URL + "login", { 
            emailOrUsername: user.emailOrUsername, 
            password: user.password 
        })
        .then( response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response.data;
            });
    }

    logout() {  // TODO:  FUNCTION TO EXPAND
        localStorage.removeItem("user");
    }

    signin(user) {
        return axios.post( API_URL + "signin", { 
            email: user.email ,
            password: user.password 
        })
    }

    signout(userUuid, data) {
        return axios.delete(API_URL + `signout/${userUuid}`, {
            headers: authHeader(),
            data: { password: data.password }
        })
    }
    
    updatePassword(userUuid, data) {
        return axios.put(API_URL + `updatepassword/${userUuid}`, { 
                passwordOld: data.passwordOld,
                password: data.password 
            },
            { headers: authHeader()  }
        )
    }
}

export default new AuthService();
