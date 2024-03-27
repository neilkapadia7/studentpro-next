import { combineReducers } from "redux";
import authReducer from "./auth";

export default combineReducers({
    auth: authReducer,
    // students,
    // batch,
    // syllabus,
    // liveSessions,
    // institute,
});
  