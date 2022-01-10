import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import * as s from "../actions/save-project";

const SAVE_PROJECT_URL = "/.netlify/functions/addFavoriteProject";
const REMOVE_PROJECT_URL = "/.netlify/functions/removeFavoriteProject";
const GET_SAVED_PROJECTS_URL = "/.netlify/functions/getFavoriteProjects";

function* saveProjectAction({ projectId, email }) {
  console.log("saveProjectAction payload", { projectId, email });
  const request = () => axios.post(SAVE_PROJECT_URL, { projectId, email });

  try {
    yield put({
      type: s.SAVE_PROJECT_SUCCESS,
      projectId,
    });

    yield call(request);
  } catch (error) {
    yield put({ type: s.SAVE_PROJECT_ERROR, message: error.message });
  }
}

function* deleteProjectAction({ projectId, email }) {
  console.log("deleteProjectAction payload", { projectId, email });
  const request = () => axios.post(REMOVE_PROJECT_URL, { projectId, email });

  try {
    yield put({
      type: s.DELETE_PROJECT_SUCCESS,
      projectId,
    });

    yield call(request);
  } catch (error) {
    yield put({ type: s.DELETE_PROJECT_ERROR, message: error.message });
  }
}

function* getSavedProjectsAction({ email }) {
  const request = () => axios.post(GET_SAVED_PROJECTS_URL, { email });

  try {
    const req = yield call(request);

    yield put({ type: s.GET_PROJECTS_SUCCESS, payload: req.data });
  } catch (error) {
    yield put({ type: s.GET_PROJECTS_ERROR, message: error.message });
  }
}

function* saveProjectSaga() {
  yield takeLatest(s.SAVE_PROJECT_TRIGGER, saveProjectAction);
  yield takeLatest(s.DELETE_PROJECT_TRIGGER, deleteProjectAction);
  yield takeLatest(s.GET_PROJECTS_TRIGGER, getSavedProjectsAction);
}

export default saveProjectSaga;
