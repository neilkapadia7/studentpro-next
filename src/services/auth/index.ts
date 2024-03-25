import axios from 'axios';
import API_URL from "../../constants/index";

interface loginParams {
    email: String,
    password: String
}

interface registerParams {
    name: String,
    email: String,
    password: String
}

async function login(params:loginParams) {
    axios.post(`${API_URL}api/auth/login`, params);
}

async function signup(params:registerParams) {
    axios.post(`${API_URL}api/auth/signup`, params);
}

async function changePassword(params:loginParams) {
    axios.post(`${API_URL}api/auth/passwordChange`, params);
}

const authService = {

};

export default authService;