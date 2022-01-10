import React, { useCallback, useEffect, useState } from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

import Image from "../basic/image/Image";
import UniversalLink from "../../utils/UniversalLink";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import { GOOGLE_LOGIN_TRIGGER } from "../../redux/actions/session";
import { GET_PROJECTS_TRIGGER } from "../../redux/actions/save-project";
import { GET_FLOOR_PLANS_TRIGGER } from "../../redux/actions/save-floor-plan";

import buttonIcon from "../../assets/header/header-logo.svg";

import "./Header.css";

const Header = ({ logoLink, variant, isStickyHeader, className }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      contentfulHeader(isTemplateSample: { ne: true }) {
        headerLogo {
          ...Image
        }
        headerLogoPremium {
          ...Image
        }
        headerLogoPrestige {
          ...Image
        }
        headerLogoMobileBlack {
          ...Image
        }
        headerLogoMobileWhite {
          ...Image
        }
      }
    }
  `);
  const { headerLogo, headerLogoPremium, headerLogoPrestige, headerLogoMobileWhite, headerLogoMobileBlack } =
    data.contentfulHeader;

  const isDesktop = useApplyAfterWidth(833);

  let logoImage;
  if (variant === "prestige") {
    logoImage = isDesktop ? headerLogoPrestige : headerLogoMobileWhite;
  } else if (variant === "premium") {
    logoImage = isDesktop ? headerLogoPremium : headerLogoMobileWhite;
  } else if (variant === "home") {
    logoImage = isDesktop ? headerLogo : headerLogoMobileWhite;
  } else {
    logoImage = isDesktop ? headerLogo : headerLogoMobileBlack;
  }

  const [headerStyle, setHeaderStyle] = useState(false);

  useScrollPosition(
    ({ currPos }) => {
      const isVisible = window.innerHeight < Math.abs(currPos.y);
      isVisible ? setHeaderStyle(true) : setHeaderStyle(false);
    },
    [headerStyle]
  );

  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const [waitingForLoginRedirect, setWaitingForLoginRedirect] = useState(false);

  const userButton = useCallback(() => {
    if (session.isLoggedIn === false) {
      dispatch({ type: GOOGLE_LOGIN_TRIGGER });
      setWaitingForLoginRedirect(true);
    } else {
      navigate("/user-dashboard");
    }
  }, [session, dispatch, setWaitingForLoginRedirect]);

  useEffect(() => {
    if (waitingForLoginRedirect && session.googleLoginUrl) {
      // go to Google Login Page
      window.location = session.googleLoginUrl;
    } else if (session.isLoggedIn) {
      dispatch({ type: GET_PROJECTS_TRIGGER, email: session.email });
      dispatch({ type: GET_FLOOR_PLANS_TRIGGER, email: session.email });
    }
  }, [session, waitingForLoginRedirect, dispatch]);

  const isStickyHeaderMobile = isStickyHeader || headerStyle ? (isDesktop ? null : headerLogoMobileBlack) : null;
  return (
    <div
      className={`absolute w-full pl-27px pr-22px md:px-20px z-100 ${className} ${
        isStickyHeader || headerStyle ? "header-show" : ""
      }`}
    >
      <div
        className={`justify-between mx-auto flex pt-50px md:pt-5px mb-10px md:pb-5px ${
          isStickyHeaderMobile ? "mt-30px" : ""
        }`}
      >
        <UniversalLink link={logoLink} className={`mt-10px ${isStickyHeaderMobile ? "mt-20px mx-auto" : " mt-15px"}`}>
          <Image
            image={isStickyHeader || headerStyle ? (isDesktop ? headerLogo : headerLogoMobileBlack) : logoImage}
            className={`${isStickyHeaderMobile ? "ml-45px w-140px" : ""}`}
          />
        </UniversalLink>
        <button onClick={userButton} className="button-circle-shadow rounded-full w-49px h-49px mt-8px mb-8px mr-2px">
          <img src={buttonIcon} alt="button-icon" className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  image: PropTypes.object,
  logoLink: PropTypes.string,
  isStickyHeader: PropTypes.bool,
  variant: PropTypes.oneOf(["prestige", "premium"]),
  className: PropTypes.string,
};

Header.defaultProps = {
  image: {},
  logoLink: "/",
  isStickyHeader: false,
  className: "",
};

export default Header;
