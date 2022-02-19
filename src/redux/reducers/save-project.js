import * as s from "../actions/save-project";
const initial = { isPending: false, isFetched: false, savedProjects: [] };

export default function saveProjectReducer(state = initial, action = null) {
  switch (action.type) {
    case s.SAVE_PROJECT_ERROR:
      console.error(s.SAVE_PROJECT_ERROR, action);
      return { ...state, isPending: false, error: action };

    case s.SAVE_PROJECT_SUCCESS:
      console.log(s.SAVE_PROJECT_SUCCESS, action);
      return { ...state, isPending: false, savedProjects: [...state.savedProjects, action.projectId] };

    case s.SAVE_PROJECT_TRIGGER:
      console.log(s.SAVE_PROJECT_TRIGGER, action);
      return { ...state, isPending: true };

    case s.DELETE_PROJECT_ERROR:
      console.error(s.DELETE_PROJECT_ERROR, action);
      return { ...state, isPending: false, error: action };

    case s.DELETE_PROJECT_SUCCESS:
      console.log(s.DELETE_PROJECT_SUCCESS, action);
      return {
        ...state,
        isPending: false,
        savedProjects: [...state.savedProjects.filter(id => id !== action.projectId)],
      };

    case s.DELETE_PROJECT_TRIGGER:
      console.log(s.DELETE_PROJECT_TRIGGER, action);
      return { ...state, isPending: true };

    case s.GET_PROJECTS_ERROR:
      console.error(s.GET_PROJECTS_ERROR, action);
      return { ...state, isPending: false, error: action };

    case s.GET_PROJECTS_SUCCESS:
      console.log(s.GET_PROJECTS_SUCCESS, action);
      return { ...state, isPending: false, isFetched: true, savedProjects: action.payload };

    case s.GET_PROJECTS_TRIGGER:
      console.log(s.GET_PROJECTS_TRIGGER, action);
      return { ...state, isPending: true };

    case s.PROJECTS_RESET_ON_LOGOUT:
      console.log(s.PROJECTS_RESET_ON_LOGOUT, action);
      return { ...initial };

    default:
      return state;
  }
}
