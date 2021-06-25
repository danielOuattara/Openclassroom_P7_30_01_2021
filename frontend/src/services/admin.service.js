
import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:4200/api/admin";

class AdminService {

   getPhotosReports() {
        return axios.get(API_URL + "/reports/photos", { headers: authHeader() });
   }

   getPhotoCommentsReports() {
        return axios.get(API_URL + "/reports/photos/comments", { headers: authHeader() });
   }
}

export default new AdminService();
