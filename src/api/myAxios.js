import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://109.233.108.126:7095'
});