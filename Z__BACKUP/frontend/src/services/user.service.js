
// Now we define a service for accessing data in user.service.js:

import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:4200/api/users";


class UserService {
    
    getUserBoard() {
        return axios.get(API_URL + "/userboard", { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + "/adminboard", { headers: authHeader() });
    }

    getOneUser(userUuid) {
        return axios.get(API_URL + `/${userUuid}`, { headers: authHeader() })
    }

    getAllUsers() {
        return axios.get(API_URL + "/", { headers: authHeader() })
    }

    updateUserInfos(userUuid, data) {
        return axios.put(API_URL + `/infos/${userUuid}`, 
        data.formData,  
        { headers: authHeader() }, 
        data.config )
    }

    searchUsers() {}  // ## TODO

}

export default new UserService();
