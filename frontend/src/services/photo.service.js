
// Now we define a service for accessing data in photo.service.js:

import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:4200/api/photos";

class PhotoService {
    
    addPhoto(data) {
        const config =  {
            headers : {'Content-Type': 'multipart/form-data' }
        }
        return axios.post(API_URL + "/", 
            { title: data.get('title'), image: data.get('image') }, 
            { headers: authHeader() }, 
            config
        )  
    }

    getAllPhotos() {
        return axios.get(API_URL + "/", { headers: authHeader() });
    }

    getOnePhoto(photoUuid) {
        return axios.get(API_URL + `/${photoUuid}`, { headers: authHeader() })
    }

    getAllPhotosFromOneUser(userUuid) {
        return axios.get(API_URL + `/user/${userUuid}`, { headers: authHeader() })
    }

    deleteOnePhoto(photoUuid) {
        return axios.delete(API_URL + `/${photoUuid}`, { headers: authHeader() })
    }

    userDeleteAllPhotos() {
        return axios.delete(API_URL + "/", { headers: authHeader() })
    }

    deleteAllPhotosFromOneUser(userUuid) {
        return axios.delete(API_URL + `/${userUuid}`, { headers: authHeader() })
    }

    searchPhotos() {}  // TODO !
    

}

export default new PhotoService();

