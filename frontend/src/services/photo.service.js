
// Now we define a service for accessing data in photo.service.js:

import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:4200/api/photos";

class PhotoService {
    
    addPhoto() {
        return axios.post(API_URL + "/", { headers: authHeader() });
    }

    getAllPhoto() {
        return axios.get(API_URL + "/", { headers: authHeader() });
    }

    getOnePhoto() {
        return axios.get(API_URL + "/:photoUuid", { headers: authHeader() })
    }

    deleteOnePhoto() {
        return axios.delete(API_URL + "/:photoUuid", { headers: authHeader() })
    }

    deleteUserAllPhoto() {
        return axios.delete(API_URL + "/", { headers: authHeader() })
    }

    deleteAllPhotoFromOneUser() {
        return axios.delete(API_URL + "/userUuid", { headers: authHeader() })
    }

    searchPhoto() {}  // TODO !
    

}

export default new PhotoService();

