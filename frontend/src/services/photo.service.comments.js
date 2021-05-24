
// Now we define a service for accessing data in photo.service.js:

import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:4200/api/photos/:photoUuid/comments";
const API_URL_2 = "http://localhost:4200/api/photos/:userUuid/comments";

class PhotoCommentsService {
    
    createComment() {
        return axios.post(API_URL , { headers: authHeader() })
    }
    getAllPhotoComment() {
        return axios.get(API_URL , { headers: authHeader() })
    }

    getOneComment() {
        return axios.get(API_URL + "/:commentUuid", { headers: authHeader() })
    }

    updateOneComment() {
        return axios.put(API_URL + "/:commentUuid", { headers: authHeader() })
    }

    deleteOneComment() {
        return axios.delete(API_URL + "/:commentUuid", { headers: authHeader() })
    }

    deleteAllCommentFromOnePhoto() {
        return axios.delete(API_URL + "/", { headers: authHeader() })
    }

    deleteAllCommentFromOneUser() {
        return axios.delete(API_URL_2 , { headers: authHeader() })
    }
}

export default new PhotoCommentsService();

