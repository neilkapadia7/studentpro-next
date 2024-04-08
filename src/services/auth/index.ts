import axios from 'axios';
import {API_URL} from "../../constants/index";

interface loginParams {
    email: String,
    password: String
}

interface registerParams {
    name: String,
    email: String,
    password: String
}

type addNewUserType = {
    name: string,
    email: string,
    password: string,
    instituteId?: string,
    isManualUserGeneration?: boolean, 
    accessType?: "Instructor" | "InstituteAdmin" | "BatchAdmin"
    batchId?: string
  }

export async function getLoggedInUser() {
    return axios.get(`${API_URL}api/auth`);
}

export async function login(params:loginParams) {
    return axios.post(`${API_URL}api/auth/login`, params)
        .then(res =>  res)
        .catch(err => err.response);
}

export async function signup(params:addNewUserType) {
    return axios.post(`${API_URL}api/auth/signup`, params)
        .then(res =>  res)
        .catch(err => err.response);
}

export async function changePassword(params:loginParams) {
    return axios.post(`${API_URL}api/auth/passwordChange`, params)
        .then(res =>  res)
        .catch(err => err.response);
}


export async function getAllInstituteUsers() {
    return axios.get(`${API_URL}api/auth/getAllUsers`)
        .then(res => res)
        .catch(err => {
            console.log("Api Error in Admin service -> ", err);
            return err;
        });
}

const authService = {
    getLoggedInUser,
    login,
    signup,
    changePassword
};

// export default authService;