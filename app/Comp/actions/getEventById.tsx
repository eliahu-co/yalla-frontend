import { API_URL } from "@/app/config";
import axios from "axios";

export default function getAllCategories() {
    return axios.get(`${API_URL}/categories`)
        .then(response => {
            if (!response.data) {
                return null;
            }
            return response.data;
        })
        .catch(error => {
            console.error(error.message);
        });
}