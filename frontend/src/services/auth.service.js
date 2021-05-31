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

    signout () { 
         return axios.delete(API_URL + "/:userUuid", { headers: authHeader() })
    }  
}

export default new AuthService();
