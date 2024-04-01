import axios from 'axios';
import {API_URL} from "../../constants/index";

interface addNewUser {
    name: string, 
    email: string, 
    password: string, 
    isFreeUser?: boolean, 
    referralCode?: string, 
    isPremiumUser: boolean, 
    accessType: "Instructor" | "InstituteAdmin" | "BatchAdmin", 
    isAdminUser?: boolean, 
    instituteId?: string, 
    expiryDate?: Date, 
    isUnlimited?: boolean
}

type updateUserAccess = {
    userId: string, 
    expiryDate: Date, 
    terminateAccess?: boolean,
}

type updateInstitute = {
    instituteId: string, 
    image?: string, 
    name: string,
    adminId?: string,
    instructorList?: Array<string>,
    isActive: boolean,
}

export async function getAllUsers() {
    return axios.get(`${API_URL}api/admin/getAllUsers`)
        .then(res => res.data)
        .catch(err => {
            console.log("Api Error in Admin service -> ", err);
            return err;
        });
}

export async function addNewUser(params: addNewUser) {
    return axios.post(`${API_URL}api/admin/addNewUser`, params)
        .then(res => res)
        .catch(err => {
            console.log("Api Error in Admin service -> ", err);
            return err;
        });
}

export async function updateUserAccess(params: updateUserAccess) {
    return axios.post(`${API_URL}api/admin/updateAccess`, params)
        .then(res => res)
        .catch(err => {
            console.log("Api Error in Admin service -> ", err);
            return err;
        });
}

export async function changePassword(params: {email: string, password: string}) {
    return axios.post(`${API_URL}api/admin/passwordChange`, params)
        .then(res => res)
        .catch(err => {
            console.log("Api Error in Admin service -> ", err);
            return err;
        });
}

export async function addInstitute(params: {image?: string, name: string, adminId: string}) {
    return axios.post(`${API_URL}api/admin/addInstitute`, params)
        .then(res => res)
        .catch(err => {
            console.log("Api Error in Admin service -> ", err);
            return err;
        });
}

export async function updateInstitute(params: updateInstitute) {
    return axios.post(`${API_URL}api/admin/updateInstitute`, params)
        .then(res => res)
        .catch(err => {
            console.log("Api Error in Admin service -> ", err);
            return err;
        });
}
