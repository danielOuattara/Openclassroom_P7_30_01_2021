
// Now we define a service for accessing data in photo.service.js:

import axios from "axios";
// import { likes } from "../store/modules/photo.likes.store.js";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:4200/api/photos";


class PhotoLikesService {
    
    sendPhotoLikes(photoUuid, like) {
        return axios.post(API_URL + `/${photoUuid}/likes`,
        { 
            photoUuid: like.photoUuid,
            value: like.value
        }, 
        { headers: authHeader() })
    }

    fetchPhotoLikesCounting(photoUuid) {
        return axios.get(API_URL + `/${photoUuid}/likes`, { headers: authHeader() })
    }
}

export default new PhotoLikesService();

