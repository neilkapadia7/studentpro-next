import * as batchDetails from '../../constants/actionTypes/batchDetails';
import store from '@/store/store';

type addbatch = {
    name: string,
    startDate?: Date,
    endDate?: Date,
    coursePrice?: Number,
  }
  

export const getAllStudents = () => {
    return {
        type: batchDetails.GET_STUDENTS_TRIGGER
    }
}

export const getAllStudentsResult = (payload: any) => {
    return {
        type: batchDetails.GET_STUDENTS_RESULT,
        payload: payload.data
    }
}
export const getAllBatch = () => {
    return {
        type: batchDetails.GET_BATCH_TRIGGER
    }
}

export const getAllBatchResult = (payload: any) => {
    return {
        type: batchDetails.GET_BATCH_RESULT,
        payload: payload
    }
}

export const addStudent = () => {
    return {
        type: batchDetails.ADD_STUDENTS_TRIGGER
    }
}

export const addStudentResult = (payload: any) => {
    return {
        type: batchDetails.ADD_STUDENTS_RESULT,
        payload: payload.data
    }
}
export const addBatch = (params: addbatch) => {
    return {
        type: batchDetails.ADD_BATCH_TRIGGER,
        params
    }
}

export const addBatchResult = (payload: any) => {
    setTimeout(() => {
        store.dispatch(clearError());
    }, 5000);
    return {
        type: batchDetails.ADD_BATCH_RESULT,
        payload: payload
    }
}

export const clearError = () => {
    return {
        type: batchDetails.CLEAR_ERROR,
    }
}

export const setError = (payload: {status: boolean, message: String}) => {
    setTimeout(() => {
        store.dispatch(clearError());
    }, 5000);
    return {
        type: batchDetails.LOG_ERROR,
        payload: payload.message
    }
}