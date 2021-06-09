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

    signout (userUuid, user) { 
        console.log(userUuid);
        console.log(user.password);
    
        return axios.delete(API_URL + `signout/${userUuid}`, 
        { password: user.password }, 
        { headers: authHeader() })
    }

    updatePassword(userUuid, data) {
        console.log(" from  servcie : ",userUuid)
        console.log(data)
        console.log(data.oldPassword)
        console.log(data.password)
        return axios.put(API_URL + `updatepassword/${userUuid}`, { 
            passwordOld: data.passwordOld,
            password: data.password 
        },
        { headers: authHeader() })
    }
}

export default new AuthService();
