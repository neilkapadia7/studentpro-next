import axios from 'axios';
import {API_URL} from "../../constants/index";

interface getBatchById {
    batchId: String,
}

interface studentId {
    studentId: String,
}

interface addbatch {
    name: string,
    startDate?: Date,
    endDate?: Date,
    coursePrice?: Number,
}

interface updateBatch {
    batchId: String,
    isActive: Boolean,
    name: String,
    startDate: Date,
    endDate: Date,
    coursePrice: Number,
}

export async function getAllBatch() {
    return axios.post(`${API_URL}api/batch/get`)
        .then(res => res)
        .catch(err => err);
}

export async function getBatchById(batchId: String) {
    return axios.get(`${API_URL}api/batch/get/${batchId}`)
        .then(res => res)
        .catch(err => err);
}

export async function addBatch(params:addbatch) {
    return axios.post(`${API_URL}api/batch/add`, params)
        .then(res => res)
        .catch(err => err);
}

export async function updateBatch(params:updateBatch) {
    return axios.post(`${API_URL}api/batch/update`, params)
        .then(res => res)
        .catch(err => err);
}

export async function getLiveClassesByBatch(batchId: String) {
    return axios.post(`${API_URL}api/batch/getLiveClasses`, batchId)
        .then(res => res)
        .catch(err => err);
}

const authService = {
    getAllBatch,
    getBatchById,
    addBatch,
    updateBatch,
    getLiveClassesByBatch
};

export default authService;