import { instance } from './myAxios';

export const getUserInfo = async (id, chatId) => {
    try {
        const response = await instance.get(`/api/users/${id}`, {
            headers: {
                'chatId': chatId
            }
        });
        
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

export const getUsersByMentor = async (chatId, mentorId, role) => {
    // const response = await instance.get(`/api/users?mentor_id=${mentorId}&role=${role}`, {
    //     headers: {
    //         'chatId': chatId
    //     }
    // })

    try{
        const response = await instance.get(`/api/users?role=${role}`, {
            headers: {
                'chatId': chatId
            }
        })
    
        return response;
    } catch (err){
        return err;
    }

    
}

export const getUserById = async (chatId, id) => {
    try {
        const response = await instance.get(`/api/users/${id}`, {
            headers: {
                'chatId': chatId
            }
        })
    
        return response;
    } catch (err) {
        return err;
    }

}