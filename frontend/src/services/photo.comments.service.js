
// Now we define a service for accessing data in photo.service.js:

import axios from "axios";
import authHeader from "./auth.header.js";
const API_URL = "http://localhost:4200/api/photos";

class PhotoCommentsService {

    addPhotoComment(photoUuid, data) {
        return axios.post(API_URL + `/${photoUuid}/comments` , 
            { content: data.content }, 
            { headers: authHeader() }
        )
    }
    
    deleteOneComment(photoUuid, commentUuid) {
        return axios.delete(API_URL + `/${photoUuid}/comments/${commentUuid}`, { headers: authHeader() })
    }
    
    // getAllCommentsForOnePhoto(photoUuid) {
    //     return axios.get(API_URL + `/${photoUuid}/comments` , { headers: authHeader() })
    // }

    // getOneComment(photoUuid, commentUuid) {
    //     return axios.get(API_URL + `/${photoUuid}/comments/${commentUuid}`, { headers: authHeader() })
    // }

    // updateOneComment(photoUuid, commentUuid) {
    //     return axios.put(API_URL + `/${photoUuid}/comments/${commentUuid}`, { headers: authHeader() })
    // }


    // deleteAllCommentsFromOnePhoto(photoUuid) {
    //     return axios.delete(API_URL + `/${photoUuid}/comments`, { headers: authHeader() })
    // }

    // deleteAllCommentsFromOneUser(userUuid) {
    //     return axios.delete(API_URL + `user/${userUuid}/comments`, { headers: authHeader() })
    // }
}

export default new PhotoCommentsService();

