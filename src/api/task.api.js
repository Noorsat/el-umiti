import { instance } from "./myAxios";

export const getTasks = async (chatId) => {
    try {
        const response = await instance.get(`/api/tasks`, {
            headers: {
                'chatId': chatId
            }
        })
    
        return response;
    } catch (err) {
        return err;
    }
   
}

export const getTasksByUserIdAndDirectionId = async (chatId, userId, directionId) => {
    try { 
        const response = await instance.get(`/api/tasks?user_id=${userId}&direction_id=${directionId}`, {
            headers: {
                'chatId': chatId
            }
        })
    
        return response;
    } catch (err) {
        return err;
    }

}

export const createTask = async (body) => {
    try {
        const response = await instance.post(`/api/task/create`, body);
    
        return response;
    } catch (err) { 
        return err;
    }
  
}

export const getTask = async (chatId, id) => {
    try { 
        const response = await instance.get(`/api/tasks/${id}`, {
            headers: {
                'chatId': chatId
            }
        })
    
        return response;
    } catch (err) {
        return err;
    }
   
}

export const updateTask = async (chatId, id, body) => {
    try {
        const response = await instance.put(`/api/tasks/${id}`, body, {
            headers: {
                'chatId': chatId
            }
        })

        return response;
    } catch (err) {
        return err;
    }
}

export const deleteTask = async (chatId, id) => {
    try {
        const response = await instance.delete(`/api/tasks/${id}`, body, {
            headers: {
                'chatId': chatId
            }
        })
    
        return response;
    } catch (err){
        return err;
    }
}

export const getDirections = async (id) => {
    try { 
        const response = await instance.get(`/api/user/${id}/participant-directions`);

        return response;
    } catch (err){
        return err;
    }
}