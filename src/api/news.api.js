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
        const response = await instance.post(`/api/news/${newsId}/upload-files?fileType=IMAGE`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

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

export const getNewsByType = async (type) => {
    try {
        const response = await instance.get(`/api/news/get-by-type?type=${type}`);

        return response;
    } catch (err){
        return err;
    }
}

export const getNewsImage = async (newsImageId) => {
    try {
        const response = await instance.get(`/api/news-file/${newsImageId}`, {
            responseType: 'blob',
        });

        return URL.createObjectURL(response.data);
    } catch (err){
        return err;
    }
}