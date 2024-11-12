import { instance } from "./myAxios"

export const createNews = async (body) => {
    try {
        const response = await instance.post(`/api/news/create`, body);

        return response;
    } catch (err){
        return err;
    }
}

export const uploadFilesToNews = async (newsId, body) => {
    try {
        const response = await instance.post(`/api/news/${newsId}/upload-files`, body);

        return response;
    } catch (err){
        return err;
    }
}

export const getNewsAll = async () => {
    try {
        const response = await instance.get(`/api/news/get-all`);

        return response;
    } catch (err){
        return err;
    }
}

export const getNewsItem = async (id) => {
    try {
        const response = await instance.get(`/api/news/${id}`);

        return response;
    } catch (err){
        return err;
    }
}
