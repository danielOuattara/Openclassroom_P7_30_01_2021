
import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:4200/api/photos";

class PhotoService {
    
    addPhoto(formData) {
        const config = {
            header: { "Content-Type": "multipart/form-data" },
        };
        return axios.post(API_URL + "/", formData, { headers: authHeader() }, config )  
    }

    getAllPhotos() {
        return axios.get(API_URL + "/", { headers: authHeader() });
    }

    deleteOnePhoto(photoUuid) {
        return axios.delete(API_URL + `/${photoUuid}`, { headers: authHeader() })
    }
    
    createPhotoReport(photoUuid, message) {
        return axios.post(API_URL + `/${photoUuid}/report`, {message}, { headers: authHeader() })
    }


    // getOnePhoto(photoUuid) {
    //     return axios.get(API_URL + `/${photoUuid}`, { headers: authHeader() })
    // }

    // getAllPhotosFromOneUser(userUuid) {
    //     return axios.get(API_URL + `/user/${userUuid}`, { headers: authHeader() })
    // }


    // userDeleteAllPhotos() {
    //     return axios.delete(API_URL + "/", { headers: authHeader() })
    // }

    // deleteAllPhotosFromOneUser(userUuid) {
    //     return axios.delete(API_URL + `/${userUuid}`, { headers: authHeader() })
    // }

    // searchPhotos() {}  // TODO !

    
}

export default new PhotoService();

