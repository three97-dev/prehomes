import { all } from "redux-saga/effects";

import session from "./session";
import saveProject from "./save-project";
import saveFloorPlan from "./save-floor-plan";

export default function* root() {
  yield all([session(), saveProject(), saveFloorPlan()]);
}
