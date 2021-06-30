
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

    logout(userUuid) {  
        return axios.put( API_URL + `logout/${userUuid}`, {} ,{ headers: authHeader() });
    }

    signin(data) {
        return axios.post( API_URL + "signin", { 
            email: data.email ,
            password: data.password,
            roles: data.roles,
            special: data.special,

        })
    }

    signout(userUuid, data) {
        return axios.delete(API_URL + `signout/${userUuid}`, {
            headers: authHeader(),
            data: { password: data.password }
        })
    }
}

export default new AuthService();
