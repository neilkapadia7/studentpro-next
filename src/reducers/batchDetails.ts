import { batch } from "react-redux";
import {
    ADD_STUDENTS_TRIGGER,
    ADD_STUDENTS_RESULT,
    GET_STUDENTS_TRIGGER,
    GET_STUDENTS_RESULT,
    ADD_BATCH_TRIGGER,
    ADD_BATCH_RESULT,
    GET_BATCH_TRIGGER,
    GET_BATCH_RESULT,
    CLEAR_ERROR,
    LOG_ERROR
} from "../constants/actionTypes/batchDetails";

// import * as ACTION from '../constants/actionTypes/institute';

    type action = {
        type: String,
        payload: any,
        message: String
    }
  
    const initialState = {
        errorMessage: "", 
        isError: false,
        isLoading: false,
        batch: [],
        students: [],
        currentBatchUsers: [],
        successMessage: "",
    };
    
    const authReducer = (state = initialState, action: action) => {
        switch (action.type) {
            case ADD_STUDENTS_TRIGGER:
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                }
            case ADD_STUDENTS_RESULT:
                console.log("REDUCER -> ", action.payload);
                
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    students: state.students.length > 0 ? [...state.students, action.payload] : [action.payload],
                    successMessage: `Student - ${action.payload.name || "-"} Added Succesfully`
                }
            case GET_STUDENTS_TRIGGER:
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                }
            case GET_STUDENTS_RESULT:
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    students: [...action.payload]
                }
            case ADD_BATCH_TRIGGER:
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                }
            case ADD_BATCH_RESULT:
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    batch: state.batch.length > 0 ? [...state.batch, action.payload] : [action.payload],
                    successMessage: `Batch - ${action.payload.name || "-"} Added Succesfully`
                }
            case GET_BATCH_TRIGGER:
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                }
            case GET_BATCH_RESULT:
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    batch: action.payload
                }
            
            case CLEAR_ERROR:
                return {
                    ...state,
                    isError: false,
                    errorMessage: "",
                    successMessage: ""
                };
            case LOG_ERROR:
                return {
                    ...state,
                    isError: true,
                    errorMessage: action.payload,
                }
            default:
                return state;
        }
    };
  
  export default authReducer;
  