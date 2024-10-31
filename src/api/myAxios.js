import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://5612-91-147-91-133.ngrok-free.app'
});