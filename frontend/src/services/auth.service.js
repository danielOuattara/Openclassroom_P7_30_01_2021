/* Authentication service
--------------------------

The service provides three important methods with the help of 
axios for HTTP requests & reponses:

    login(): POST { username, password } & save JWT to Local Storage
    logout(): remove JWT from Local Storage
    signin(): POST { email, password }

*/
import axios from "axios";

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

    logout() {
        localStorage.removeItem("user");
    }

    
    // register(user) {
    //     return axios.post( API_URL + "signin", { 
    //             username: user.username, 
    //             email: user.email ,
    //             password: user.password 
    //         })

    // }

    signin(user) {
        return axios.post( API_URL + "signin", { 
            email: user.email ,
            password: user.password 
        })
    }
}

export default new AuthService();
