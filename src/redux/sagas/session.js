import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import * as s from "../actions/session";

const GOOGLE_LOGIN_INIT_URL = "/.netlify/functions/googleAccount";
const GOOGLE_LOGIN_VERIFY_URL = "/.netlify/functions/googleCallback";

function* sessionGoogleLoginInit() {
  const request = () => axios.get(GOOGLE_LOGIN_INIT_URL);

  try {
    const req = yield call(request);

    yield put({ type: s.GOOGLE_LOGIN_CONFIRM_REDIRECT, payload: req.data });
  } catch (error) {
    console.error("sessionGoogleLoginInit error", error);
    yield put({ type: s.GOOGLE_LOGIN_ERROR, message: error.message });
  }
}

function* sessionGoogleLoginVerify({ code }) {
  const request = () => axios.post(GOOGLE_LOGIN_VERIFY_URL, { code });

  try {
    const req = yield call(request);

    yield put({ type: s.GOOGLE_LOGIN_SUCCESS, payload: req.data });
  } catch (error) {
    console.error("sessionGoogleLoginVerify error", error);
    yield put({ type: s.GOOGLE_LOGIN_ERROR, message: error.message });
  }
}

function* sessionSaga() {
  yield takeLatest(s.GOOGLE_LOGIN_TRIGGER, sessionGoogleLoginInit);
  yield takeLatest(s.GOOGLE_LOGIN_VERIFY_CODE, sessionGoogleLoginVerify);
}

export default sessionSaga;
