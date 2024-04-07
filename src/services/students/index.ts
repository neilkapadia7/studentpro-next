import axios from 'axios';
import {API_URL} from "../../constants/index";

interface getByBatch {
    batchId: String,
}

interface studentId {
    studentId: String,
}

interface addStudent {
    name: String,
    email: String,
    currentBatch: String,
    userId?: String,
}

export async function getAllStudents() {
    return axios.post(`${API_URL}api/student/get`)
        .then(res => res)
        .catch(err => err);
}

export async function getByBatch(params:getByBatch) {
    return axios.post(`${API_URL}api/student/getByBatch`, params)
        .then(res => res)
        .catch(err => err);
}

export async function addStudent(params:addStudent) {
    return axios.post(`${API_URL}api/student/add`, params)
        .then(res => res)
        .catch(err => err);
}

export async function updateStudent(params:studentId) {
    return axios.post(`${API_URL}api/student/updateStudent`, params)
        .then(res => res)
        .catch(err => err);
}

// const authService = {
//     getAllStudents,
//     getByBatch,
//     addStudent,
//     updateStudent
// };

// export default authService;