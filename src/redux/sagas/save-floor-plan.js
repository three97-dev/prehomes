import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import * as s from "../actions/save-floor-plan";

const SAVE_FLOOR_PLAN_URL = "/.netlify/functions/addFavoriteFloorPlan";
const REMOVE_FLOOR_PLAN_URL = "/.netlify/functions/removeFavoriteFloorPlan";
const GET_SAVED_FLOOR_PLANS_URL = "/.netlify/functions/getFavoriteFloorPlans";

function* saveFloorPlanAction({ email, floorPlanId, projectId }) {
  console.log("saveFloorPlanAction payload", { projectId, floorPlanId, email });
  const request = () => axios.post(SAVE_FLOOR_PLAN_URL, { projectId, floorPlanId, email });

  try {
    yield put({
      type: s.SAVE_FLOOR_PLAN_SUCCESS,
      floorPlanId,
      projectId,
    });

    yield call(request);
  } catch (error) {
    yield put({ type: s.SAVE_FLOOR_PLAN_ERROR, message: error.message });
  }
}

function* deleteFloorPlanAction({ email, floorPlanId, projectId }) {
  console.log("deleteFloorPlanAction payload", { projectId, floorPlanId, email });
  const request = () => axios.post(REMOVE_FLOOR_PLAN_URL, { projectId, floorPlanId, email });

  try {
    yield put({
      type: s.DELETE_FLOOR_PLAN_SUCCESS,
      floorPlanId,
      projectId,
    });

    yield call(request);
  } catch (error) {
    yield put({ type: s.DELETE_FLOOR_PLAN_ERROR, message: error.message });
  }
}

function* getSavedFloorPlansAction({ email }) {
  const request = () => axios.post(GET_SAVED_FLOOR_PLANS_URL, { email });

  try {
    const req = yield call(request);

    yield put({ type: s.GET_FLOOR_PLANS_SUCCESS, payload: req.data });
  } catch (error) {
    yield put({ type: s.GET_FLOOR_PLANS_ERROR, message: error.message });
  }
}

function* saveFloorPlanSaga() {
  yield takeLatest(s.SAVE_FLOOR_PLAN_TRIGGER, saveFloorPlanAction);
  yield takeLatest(s.DELETE_FLOOR_PLAN_TRIGGER, deleteFloorPlanAction);
  yield takeLatest(s.GET_FLOOR_PLANS_TRIGGER, getSavedFloorPlansAction);
}

export default saveFloorPlanSaga;
