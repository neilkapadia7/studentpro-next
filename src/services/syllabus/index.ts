import axios from 'axios';
import API_URL from "../../constants/index";

interface addSyllabus {
    subjectName: String,
    syllabus: Array<Object>,
    batchId: String,
    userId: String,
}

interface updateSyllabus {
    syllabusId: String,
    subjectName: String,
    syllabus: Array<Object>,
    batchId: String,
    userId: String,
}

async function getAllSyllabus() {
    axios.post(`${API_URL}api/syllabus/get`);
}

async function getSyllabusByBatch(batchId: String) {
    axios.post(`${API_URL}api/syllabus/getByBatch`, batchId);
}

async function addSyllabus(params:addSyllabus) {
    axios.post(`${API_URL}api/syllabus/add`, params);
}

async function updateSyllabus(params:updateSyllabus) {
    axios.post(`${API_URL}api/syllabus/update`, params);
}


const authService = {
    getAllSyllabus,
    getSyllabusByBatch,
    addSyllabus,
    updateSyllabus,
};

export default authService;