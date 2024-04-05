import { all } from "redux-saga/effects";
import auth from "./auth";
import BatchAndStudentSaga from "./batchDetails";

export default function* IndexSagas() {
    yield all([
      auth(),
      BatchAndStudentSaga(),
    ]);
  }
  