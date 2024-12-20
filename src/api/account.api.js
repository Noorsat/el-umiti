import { instance } from './myAxios';

export const getUserInfo = async (id) => {
    try {
        const response = await instance.get(`/api/user/${id}`);
        
        return response;
    } catch (err){
        return err;
    }
}

export const updateUserInfo = async (id, chatId, body) => {
    try { 
        const response = await instance.put(`/api/users/${id}`, body, {
            headers: {
                'chatId': chatId
            }
        })
        
        return response;
    } catch (err){
        return err;
    }
   
}

export const getUsersByMentor = async (id) => {
    // const response = await instance.get(`/api/users?mentor_id=${mentorId}&role=${role}`, {
    //     headers: {
    //         'chatId': chatId
    //     }
    // })

    try{
        const response = await instance.get(`/api/user/${id}/mentor-participants`);
    
        return response;
    } catch (err){
        return err;
    }

    
}

export const getUserById = async (id) => {
    try {
        const response = await instance.get(`/api/user/${id}`);
        
        return response;
    } catch (err) {
        return err;
    }
}

export const changeLanguage = async (id, lang) => {
    try { 
        const response = await instance.patch(`/api/user/${id}/set-language?language=${lang}`);

        return response;
    } catch (err) { 
        return err;
    }
}

export const createUser = async (body) => {
    try { 
        const response = await instance.post(`api/user/create`, body);
        
        return response;
    } catch (err){
        return err;
    }
}

export const getAddresses = async () => {
    try { 
        const response = await instance.get(`api/user/addresses`);
        
        return response;
    } catch (err){
        return err;
    }
}

export const defineMentorToUser = async (userId, mentorId) => {
    try { 
        const response = await instance.post(`api/user/${userId}/${mentorId}`);
        
        return response;
    } catch (err){
        return err;
    }
}