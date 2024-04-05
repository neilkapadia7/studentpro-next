import * as batchDetails from '../../constants/actionTypes/batchDetails';

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

export const getAlllBatchResult = (payload: any) => {
    return {
        type: batchDetails.GET_BATCH_RESULT,
        payload: payload.data
    }
}

export const clearError = () => {
    return {
        type: batchDetails.CLEAR_ERROR,
    }
}

export const setError = (payload: {status: boolean, message: String}) => {
    return {
        type: batchDetails.LOG_ERROR,
        payload: payload.message
    }
}
