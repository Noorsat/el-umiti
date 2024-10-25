import { instance } from "./myAxios";

export const getTasks = async (chatId) => {
    const response = await instance.get(`/api/tasks`, {
        headers: {
            'chatId': chatId
        }
    })

    return response;
}

export const getTasksByUserIdAndDirectionId = async (chatId, userId, directionId) => {
    const response = await instance.get(`/api/tasks?user_id=${userId}&direction_id=${directionId}`, {
        headers: {
            'chatId': chatId
        }
    })

    return response;
}

export const createTask = async (chatId, body) => {
    const response = await instance.post(`/api/tasks`, body, {
        headers: {
            'chatId': chatId
        }
    })

    return response;
}

export const getTask = async (chatId, id) => {
    const response = await instance.get(`/api/tasks/${id}`, {
        headers: {
            'chatId': chatId
        }
    })

    return response;
}

export const updateTask = async (chatId, id, body) => {
    const response = await instance.post(`/api/tasks/${id}`, body, {
        headers: {
            'chatId': chatId
        }
    })

    return response;
}

export const deleteTask = async (chatId, id) => {
    const response = await instance.delete( `/api/tasks/${id}`, body, {
        headers: {
            'chatId': chatId
        }
    })

    return response;
}