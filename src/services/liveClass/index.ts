import axios from 'axios';
import API_URL from "../../constants/index";
// To be added
interface getBatchById {
    batchId: String,
}

interface studentId {
    studentId: String,
}

interface addbatch {
    name: String,
    startDate: Date,
    endDate: Date,
    coursePrice: Number,
}

interface updateBatch {
    batchId: String,
    isActive: Boolean,
    name: String,
    startDate: Date,
    endDate: Date,
    coursePrice: Number,
}

async function getAllBatch() {
    axios.post(`${API_URL}api/batch/get`);
}

async function getBatchById(batchId: String) {
    axios.get(`${API_URL}api/batch/get/${batchId}`);
}

async function addBatch(params:addbatch) {
    axios.post(`${API_URL}api/batch/add`, params);
}

async function updateBatch(params:updateBatch) {
    axios.post(`${API_URL}api/batch/update`, params);
}

async function getLiveClassesByBatch(batchId: String) {
    axios.post(`${API_URL}api/batch/getLiveClasses`, batchId);
}

const authService = {
    getAllBatch,
    getBatchById,
    addBatch,
    updateBatch,
    getLiveClassesByBatch
};

export default authService;