import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";

import { GOOGLE_LOGIN_VERIFY_CODE } from "../../redux/actions/session";

const GoogleLoginPage = () => {
  const currentPage = useLocation();
  const urlParams = new URLSearchParams(currentPage.search);
  const googleLoginCode = urlParams.get("code") ? urlParams.get("code") : undefined;

  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const [waitingForCodeVerification, setWaitingForCodeVerification] = useState(false);

  useEffect(() => {
    const page = JSON.parse(localStorage.getItem("page"));

    if (page) {
      if (session.isLoggedIn) {
        navigate(page.pageUrl);
      } else if (googleLoginCode && waitingForCodeVerification === false) {
        dispatch({ type: GOOGLE_LOGIN_VERIFY_CODE, code: googleLoginCode });
        navigate(page.pageUrl);
        setWaitingForCodeVerification(true);
      }
    } else {
      if (session.isLoggedIn) {
        navigate("/user-dashboard");
      } else if (googleLoginCode && waitingForCodeVerification === false) {
        dispatch({ type: GOOGLE_LOGIN_VERIFY_CODE, code: googleLoginCode });
        navigate("/user-dashboard");
        setWaitingForCodeVerification(true);
      }
    }
  }, [googleLoginCode, dispatch, session]);

  return <>Loading...</>;
};
export default GoogleLoginPage;
