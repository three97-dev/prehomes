import { combineReducers } from "redux";

import session from "./session";
import saveProject from "./save-project";
import saveFloorPlan from "./save-floor-plan";

export default combineReducers({
  session,
  saveProject,
  saveFloorPlan,
});
