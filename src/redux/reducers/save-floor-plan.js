import * as s from "../actions/save-floor-plan";
const initial = { isPending: false, savedFloorPlans: [] };

export default function saveFloorPlanReducer(state = initial, action = null) {
  switch (action.type) {
    case s.SAVE_FLOOR_PLAN_ERROR:
      console.error(s.SAVE_FLOOR_PLAN_ERROR, action);
      return { ...state, isPending: false, error: action };

    case s.SAVE_FLOOR_PLAN_SUCCESS:
      console.log(s.SAVE_FLOOR_PLAN_SUCCESS, action);
      return { ...state, isPending: false, savedFloorPlans: [...state.savedFloorPlans, action.floorPlanId] };

    case s.SAVE_FLOOR_PLAN_TRIGGER:
      console.log(s.SAVE_FLOOR_PLAN_TRIGGER, action);
      return { ...state, isPending: true };

    case s.DELETE_FLOOR_PLAN_ERROR:
      console.error(s.DELETE_FLOOR_PLAN_ERROR, action);
      return { ...state, isPending: false, error: action };

    case s.DELETE_FLOOR_PLAN_SUCCESS:
      console.log(s.DELETE_FLOOR_PLAN_SUCCESS, action);
      return {
        ...state,
        isPending: false,
        savedFloorPlans: [...state.savedFloorPlans.filter(id => id != action.floorPlanId)],
      };

    case s.DELETE_FLOOR_PLAN_TRIGGER:
      console.log(s.DELETE_FLOOR_PLAN_TRIGGER, action);
      return { ...state, isPending: true };

    case s.GET_FLOOR_PLANS_ERROR:
      console.error(s.GET_FLOOR_PLANS_ERROR, action);
      return { ...state, isPending: false, error: action };

    case s.GET_FLOOR_PLANS_SUCCESS:
      console.log(s.GET_FLOOR_PLANS_SUCCESS, action);
      return { ...state, isPending: false, savedFloorPlans: action.payload };

    case s.GET_FLOOR_PLANS_TRIGGER:
      console.log(s.GET_FLOOR_PLANS_TRIGGER, action);
      return { ...state, isPending: true };

    default:
      return state;
  }
}
