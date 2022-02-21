import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import * as s from "../actions/session";

import { PROJECTS_RESET_ON_LOGOUT } from "../actions/save-project";
import { FLOORS_RESET_ON_LOGOUT } from "../actions/save-floor-plan";

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

function* sessionLogout() {
  yield put({ type: s.GOOGLE_LOGOUT });
  yield put({ type: PROJECTS_RESET_ON_LOGOUT });
  yield put({ type: FLOORS_RESET_ON_LOGOUT });
}

function* sessionSaga() {
  yield takeLatest(s.GOOGLE_LOGIN_TRIGGER, sessionGoogleLoginInit);
  yield takeLatest(s.GOOGLE_LOGIN_VERIFY_CODE, sessionGoogleLoginVerify);
  yield takeLatest(s.GOOGLE_LOGOUT_TRIGGER, sessionLogout);
}

export default sessionSaga;
