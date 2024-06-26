// import { call, put, takeLatest, all, select, take } from 'redux-saga/effects';
import * as Effects from "redux-saga/effects";

const call: any = Effects.call;
const put: any = Effects.put;
const takeLatest: any = Effects.takeLatest;
const all: any = Effects.all;
const select: any = Effects.select;
const take: any = Effects.take;

import * as batchDetailsActions from '../actions/reduxActions/batchDetails';
import * as constants from '../constants/actionTypes/batchDetails';
import * as authService from '../services/auth';
import * as adminService from '../services/admin';
import * as batchService from '../services/batch';
import * as studentService from '../services/students';

import Hashids from "hashids";

type addNewUserType = {
  name: string,
  email: string,
  password: string
  instituteId?: string,
  isManualUserGeneration: boolean, 
  accessType: "Instructor" | "InstituteAdmin" | "BatchAdmin"
  batchId: string
}

type addbatch = {
  name: string,
  startDate?: Date,
  endDate?: Date,
  coursePrice?: Number,
}

type addStudent = {
  name: String,
  email: String,
  currentBatch: String,
  userId?: String,
}


function* getAllStudentsSaga(param: any): Generator<any> {
  
  let payload = {
    status: false,
    message: "Could not fetch data",
  };
  try {
    const getUserData:any = yield call(studentService.getAllStudents);
      
    
    if (getUserData.status === 200) {
      yield put(batchDetailsActions.getAllStudentsResult(getUserData.data.data));
    }

  } catch (error: any) {
    console.log("ERROR -> ", error);
    payload = {
      ...payload,
      message: error.message || error.response.message,
    };
    yield put(batchDetailsActions.setError({...payload}));
  }
}

function* getAllBatchSaga(param: any): Generator<any> {
    let payload = {
      status: false,
      message: "Could not fetch data",
    };
    try {
      const getUserData:any = yield call(batchService.getAllBatch);
      
      if (getUserData.status === 200) {
        yield put(batchDetailsActions.getAllBatchResult(getUserData.data.data));
      }
  
    } catch (error: any) {
      console.log("ERROR -> ", error);
      payload = {
        ...payload,
        message: error.message || error.response.message,
      };
      yield put(batchDetailsActions.setError({...payload}));
    }
  }

function* addBatchSaga({params}: {params: addbatch}): Generator<any> {
    let payload = {
      status: false,
      message: "Could not fetch data",
    };
    try {
      const getUserData:any = yield call(batchService.addBatch, params);
      
      if (getUserData.status === 200) {
        yield put(batchDetailsActions.addBatchResult(getUserData.data.data));
      } else {
        payload.message = getUserData.response.data.message || getUserData.message;
        console.log("ERROR addBatchSaga -> ", getUserData.response.data.message);
        yield put(batchDetailsActions.setError({...payload}));
      }
  
    } catch (error: any) {
      console.log("ERROR addBatchSaga -> ", error);
      payload = {
        ...payload,
        message: error.message || error.response.message,
      };
      yield put(batchDetailsActions.setError({...payload}));
    }
  }


function* addStudentSaga({params}: {params: addStudent}): Generator<any> {
    let payload = {
      status: false,
      message: "Could not fetch data",
    };
    try {

      const getUserData:any = yield call(studentService.addStudent, params);
      
      if (getUserData.status === 200) {
        yield put(batchDetailsActions.addStudentResult(getUserData.data.data));
      } else {
        payload.message = getUserData.response.data.message || getUserData.message;
        console.log("ERROR addStudentSaga -> ", getUserData.response.data.message);
        yield put(batchDetailsActions.setError({...payload}));
      }
  
    } catch (error: any) {
      console.log("ERROR addStudentSaga -> ", error);
      payload = {
        ...payload,
        message: error.message || error.response.message,
      };
      yield put(batchDetailsActions.setError({...payload}));
    }
  }

  function* getInstituteUsers(param: any): Generator<any> {
    let payload = {
      status: false,
      message: "Could not fetch data",
    };
    try {
      const getUserData:any = yield call(authService.getAllInstituteUsers);
      if (getUserData.status === 200) {
        yield put(batchDetailsActions.getAllInstituteUsersResult(getUserData.data.data));
      }
  
    } catch (error: any) {
      console.log("ERROR -> ", error);
      payload = {
        ...payload,
        message: error.message || error.response.message,
      };
      yield put(batchDetailsActions.setError({...payload}));
    }
  }

function* addInstituteUser({params}: {params: addNewUserType}): Generator<any> {
    let payload = {
      status: false,
      message: "Could not fetch data",
    };
    try {
      params.isManualUserGeneration = true;
      const getUserData:any = yield call(authService.signup, params);
      
      if (getUserData.status === 200) {
        yield put(batchDetailsActions.addInstituteUserResult(getUserData.data.data));
      } else {
        payload.message = getUserData.response.data.message || getUserData.message;
        console.log("ERROR addInstituteUser saga -> ", getUserData.response.data.message);
        yield put(batchDetailsActions.setError({...payload}));
      }
  
    } catch (error: any) {
      console.log("ERROR addInstituteUser saga -> ", error);
      payload = {
        ...payload,
        message: error.message || error.response.message,
      };
      yield put(batchDetailsActions.setError({...payload}));
    }
  }

export default function* actionWatcher() {
  yield all([
    takeLatest(constants.GET_STUDENTS_TRIGGER, getAllStudentsSaga),
    takeLatest(constants.GET_BATCH_TRIGGER, getAllBatchSaga),
    takeLatest(constants.ADD_STUDENTS_TRIGGER, addStudentSaga),
    takeLatest(constants.ADD_BATCH_TRIGGER, addBatchSaga),
    takeLatest(constants.GET_INSTITUTE_USERS_TRIGGER, getInstituteUsers),
    takeLatest(constants.ADD_INSTITUTE_USER_TRIGGER, addInstituteUser),
  ]);
}
