import { instance } from './myAxios';

export const getUserInfo = async (id, chatId) => {
    const response = await instance.get(`/api/users/${id}`, {
        headers: {
            'chatId': chatId
        }
    });
    
    return response;
}

export const updateUserInfo = async (id, chatId, body) => {
    const response = await instance.put(`/api/users/${id}`, body, {
        headers: {
            'chatId': chatId
        }
    })
    
    return response;
}

export const getUsersByMentor = async (chatId, mentorId, role) => {
    // const response = await instance.get(`/api/users?mentor_id=${mentorId}&role=${role}`, {
    //     headers: {
    //         'chatId': chatId
    //     }
    // })

    const response = await instance.get(`/api/users?role=${role}`, {
        headers: {
            'chatId': chatId
        }
    })

    return response;
}

export const getUserById = async (chatId, id) => {
    const response = await instance.get(`/api/users/${id}`, {
        headers: {
            'chatId': chatId
        }
    })

    return response;
}