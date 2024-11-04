import { instance } from "./myAxios";

export const getMentors = async () => {
    try { 
        const response = await instance.get(`/api/user/mentors`);
        
        return response;
    } catch (err){ 
        return err;
    }
}