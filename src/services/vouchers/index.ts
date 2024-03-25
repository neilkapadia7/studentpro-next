import axios from 'axios';
import API_URL from "../../constants/index";

interface getBatchById {
    batchId: String,
}

interface studentId {
    studentId: String,
}

interface addVouhcer {
    name: String,
    expiryDate: Date,
    limit: Number
}

interface updateVoucher {
    voucherId: String,
    isActive: Boolean,
    name: String,
    expiryDate: Date,
    limit: Number
}

async function getAllVouchers() {
    axios.post(`${API_URL}api/voucher/get`);
}

async function getVoucherById(voucherId: String) {
    axios.get(`${API_URL}api/voucher/get/${voucherId}`);
}

async function addVoucher(params:addVouhcer) {
    axios.post(`${API_URL}api/voucher/add`, params);
}

async function updateVoucher(params:updateVoucher) {
    axios.post(`${API_URL}api/voucher/updateVoucher`, params);
}


const authService = {
    getAllVouchers,
    getVoucherById,
    addVoucher,
    updateVoucher,
};

export default authService;