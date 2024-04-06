import { combineReducers } from "redux";
import authReducer from "./auth";
import BatchAndStudentReducer from "./batchDetails";

export default combineReducers({
    auth: authReducer,
    batchDetails: BatchAndStudentReducer,
    // students,
    // batch,
    // syllabus,
    // liveSessions,
    // institute,
});
  