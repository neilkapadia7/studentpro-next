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
import * as batchService from '../services/batch';
import * as studentService from '../services/students';

import Hashids from "hashids";


type signIn = {
    payload: {
        email: String,
        password: String,
    }
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

export default function* actionWatcher() {
  yield all([
    takeLatest(constants.GET_STUDENTS_TRIGGER, getAllStudentsSaga),
    takeLatest(constants.GET_BATCH_TRIGGER, getAllBatchSaga),
    // takeLatest(constants.ADD_STUDENTS_TRIGGER, addStudentSaga),
    // takeLatest(constants.ADD_BATCH_TRIGGER, addBatchSaga),
  ]);
}
