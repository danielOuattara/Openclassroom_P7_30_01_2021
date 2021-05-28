
// Now we define a service for accessing data in user.service.js:

import axios from "axios";
import authHeader from "./auth.header.js";

// const API_URL = "http://localhost:4200/api/test/";
const API_URL = "http://localhost:4200/api/users";


class UserService {
    
    getUserBoard() {
        return axios.get(API_URL + "/userboard", { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + "/adminboard", { headers: authHeader() });
    }

    getOneUser() {
        return axios.get(API_URL + "/:userUuid", { headers: authHeader() })
    }

    getAllUser() {
        return axios.get(API_URL + "/", { headers: authHeader() })
    }

    updateOneUser() {
        return axios.put(API_URL + "/:userUuid ", { headers: authHeader() })
    }

    searchUsers() {}  // ## TO DO

}

export default new UserService();

