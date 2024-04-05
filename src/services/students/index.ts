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
    userId: String,
}

async function getAllStudents() {
    axios.post(`${API_URL}api/student/get`);
}

async function getByBatch(params:getByBatch) {
    axios.post(`${API_URL}api/student/getByBatch`, params);
}

async function addStudent(params:addStudent) {
    axios.post(`${API_URL}api/student/add`, params);
}

async function updateStudent(params:studentId) {
    axios.post(`${API_URL}api/student/updateStudent`, params);
}

const authService = {
    getAllStudents,
    getByBatch,
    addStudent,
    updateStudent
};

export default authService;