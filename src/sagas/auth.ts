// import { call, put, takeLatest, all, select, take } from 'redux-saga/effects';
import * as Effects from "redux-saga/effects";

const call: any = Effects.call;
const put: any = Effects.put;
const takeLatest: any = Effects.takeLatest;
const all: any = Effects.all;
const select: any = Effects.select;
const take: any = Effects.take;

import * as authAction from '../actions/reduxActions/auth';
import * as authConst from '../constants/actionTypes/auth';
import * as authService from '../services/auth';

// let {login} = authService;
// import {login} from '../services/auth';
import Hashids from "hashids";


type signIn = {
    payload: {
        email: String,
        password: String,
    }
    // USER_SIGNIN: String
}

// type signInSuccess = {
//     status: boolean,
//     data: Object,
//     message: String,
// }

function* userSignInSaga(param: signIn): Generator<any> {
  const auth = yield select((state: { auth: object }) => state.auth);
  let payload = {
    status: false,
    message: "Could not fetch data",
  };
  try {
    console.log("Auth Saga Called -> ", param)
    const response:any = yield call(authService.login, param.payload);
    if (response.status === 200) {
      if (response.data.status === true) {
        localStorage.setItem('token', response.data.data.token)
        // yield put(authAction.getUserDetails(response.data.data._id));
        payload = {
            status: true,
            message: "Success",
        };
        yield put(authAction.userSignInResult({ ...payload, data: response.data.data }));

      }
    }

    if (!payload.status) {
      payload = {
        ...payload,
        message: response.data.message || response.message,
      };
      yield put(authAction.setError({ ...payload }));
    }

  } catch (error: any) {
    payload = {
      ...payload,
      message: error.message || error.response.message,
    };
    console.log("WE HAD AND ERROR ->", error)
    yield put(authAction.setError({...payload}));
  }
}

// function* userSignUpSaga(param) {
  
// }

// function* resetPasswordSaga(param) {
  
// }

// function* getUserDetailSaga(param) {
  
// }

// function* userProfileSaga(updatePayment) {
 
// }

// function* saveBasicdetailsSaga(params) {
  
// }


export default function* actionWatcher() {
  yield all([
    
    takeLatest(authConst.USER_SIGNIN, userSignInSaga),
    // takeLatest(authConst.USER_SIGNIN, userSignInSaga),
  ]);
}
