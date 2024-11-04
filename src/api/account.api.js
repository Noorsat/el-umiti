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