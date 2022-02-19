import * as s from "../actions/session";

const initial = {
  isLoggedIn: false,
  email: null,
  name: null,
  given_name: null,
  family_name: null,
  hubspotContact: null,
};
const initialCopy = Object.assign({}, initial);

if (typeof window !== "undefined") {
  const sessionRaw = localStorage.getItem("__session");
  if (sessionRaw) {
    const sessionParsed = JSON.parse(sessionRaw);

    initialCopy.email = sessionParsed.email;
    initialCopy.name = sessionParsed.name;
    initialCopy.given_name = sessionParsed.given_name;
    initialCopy.family_name = sessionParsed.family_name;
    initialCopy.hubspotContact =  sessionParsed.hubspotContact;
    initialCopy.isLoggedIn = true;
  }
}

export default function sessionReducer(state = initialCopy, action = null) {
  switch (action.type) {
    case s.GOOGLE_LOGIN_ERROR:
      console.error(s.GOOGLE_LOGIN_ERROR, action);
      return { ...state };

    case s.GOOGLE_LOGIN_SUCCESS:
      console.log(s.GOOGLE_LOGIN_SUCCESS, action);
      localStorage.setItem("__session", JSON.stringify(action.payload));
      return { ...state, ...action.payload, isLoggedIn: true };

    case s.GOOGLE_LOGIN_CONFIRM_REDIRECT:
      console.log(s.GOOGLE_LOGIN_CONFIRM_REDIRECT, action);
      return { ...state, googleLoginUrl: action.payload.url };

    case s.GOOGLE_LOGOUT:
      console.log(s.GOOGLE_LOGOUT, action);
      localStorage.clear();
      return { ...initial };

    default:
      return state;
  }
}
