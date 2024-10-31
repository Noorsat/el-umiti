import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://api.k12.kz/api/umitibk'
});