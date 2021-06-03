
// Now we define a service for accessing data in photo.service.js:

import axios from "axios";
import authHeader from "./auth.header.js";
// import comment from './../models/comment.js'
const API_URL = "http://localhost:4200/api/photos";

class PhotoCommentsService {

    createPhotoComment(photoUuid, {...comment}) {
        return axios.post(API_URL + `/${photoUuid}/comments` , 
            { content: comment.value }, 
            { headers: authHeader() }
        )
    }
    
    getAllPhotoComments(photoUuid) {
        return axios.get(API_URL + `/${photoUuid}/comments` , { headers: authHeader() })
    }

    getOneComment(photoUuid, commentUuid) {
        return axios.get(API_URL + `/${photoUuid}/comments/${commentUuid}`, { headers: authHeader() })
    }

    updateOneComment(photoUuid, commentUuid) {
        return axios.put(API_URL + `/${photoUuid}/comments/${commentUuid}`, { headers: authHeader() })
    }

    deleteOneComment(photoUuid, commentUuid) {
        return axios.delete(API_URL + `/${photoUuid}/comments/${commentUuid}`, { headers: authHeader() })
    }

    deleteAllCommentsFromOnePhoto(photoUuid) {
        return axios.delete(API_URL + `/${photoUuid}/comments`, { headers: authHeader() })
    }

    deleteAllCommentsFromOneUser(userUuid) {
        return axios.delete(API_URL + `user/${userUuid}/comments`, { headers: authHeader() })
    }
}

export default new PhotoCommentsService();

