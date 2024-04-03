import axios from 'axios';
import {API_URL} from "../../constants/index";

type addInstitute = {
    name: string, 
    image?: string
}

type updateInstitute = {
    instituteId: string,
    name?: string, 
    image?: string,
    isActive?: boolean
}


export async function addInstitute(params: addInstitute) {
    return axios.post(`${API_URL}api/institute/addInstitute`, params)
        .then(res => res)
        .catch(err => {
            console.log("Error -> ", err);
            return err;
        });
}

export async function updateInstitute(params: updateInstitute) {
    return axios.post(`${API_URL}api/institute/updateInstitute`, params)
        .then(res => res)
        .catch(err => {
            console.log("Error -> ", err);
            return err;
        });
}
