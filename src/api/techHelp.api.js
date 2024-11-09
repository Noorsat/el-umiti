import { instance } from "./myAxios"

export const getTechSupportsByMentorId = async (mentorId) => {
    const response = await instance.get(`/api/tech-support/${mentorId}/tech-supports`);

    return response;
}

export const createTechSupport = async (body) => {
    const response = await instance.post(`/api/tech-support/create`, body);

    return response;
}

export const setAcceptTechSupport = async (supportId, accept) => {
    const response = await instance.patch(`/api/tech-support/${supportId}/set-accept?accept=${accept}`);

    return response;
}

export const getTechSupportById = async (supportId) => {
    const response = await instance.get(`/api/tech-support/${supportId}`);

    return response;
}

export const getTechSupports = async () => {
    const response = await instance.get(`/api/tech-support/get-all`);

    return response;
} 