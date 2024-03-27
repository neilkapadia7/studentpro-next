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

export async function getLoggedInUser() {
    return axios.get(`${API_URL}api/auth`);
}

export async function login(params:loginParams) {
    return axios.post(`${API_URL}api/auth/login`, params)
        .then(res =>  res)
        .catch(err => err.response);
}

export async function signup(params:registerParams) {
    return axios.post(`${API_URL}api/auth/signup`, params)
        .then(res =>  res)
        .catch(err => err.response);
}

export async function changePassword(params:loginParams) {
    return axios.post(`${API_URL}api/auth/passwordChange`, params)
        .then(res =>  res)
        .catch(err => err.response);
}

const authService = {
    getLoggedInUser,
    login,
    signup,
    changePassword
};

// export default authService;