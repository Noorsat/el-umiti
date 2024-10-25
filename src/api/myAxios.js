import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://a948-94-247-135-103.ngrok-free.app'
});