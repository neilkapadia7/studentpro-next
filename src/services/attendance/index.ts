import axios from 'axios';
import {API_URL} from "../../constants/index";

interface addAttendance {
    date: Date,
    students: Array<String>,
    batchId: String,
    liveClassId: String,
}


async function getAllAttendanceByClassId(liveClassId:String) {
    axios.post(`${API_URL}api/attendance/get`, liveClassId);
}

async function markAttendance(params: addAttendance) {
    axios.post(`${API_URL}api/attendance/mark`, params);
}

const authService = {
    getAllAttendanceByClassId,
    markAttendance
};

export default authService;