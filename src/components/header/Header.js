import React, { useCallback, useEffect, useState } from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import PropTypes from "prop-types";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

import Image from "../basic/image/Image";
import UniversalLink from "../../utils/UniversalLink";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";
import BurgerMenu from "../burger-menu/BurgerMenu";

import BurgerMenuNotActiveImage from "../../assets/header/burger-menu-inactive.svg";

import "./Header.css";

const Header = ({ logoLink, variant, isStickyHeader, className }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      contentfulHeader(isTemplateSample: { ne: true }) {
        headerLogo {
          ...Image
        }
        headerLogoHome {
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
        headerLoginLabel
        headerLogoutLabel
        childrenContentfulHeaderHeaderLinksJsonNode {
          name
          link
          image
        }
      }
    }
  `);
  const {
    headerLogo,
    headerLogoHome,
    headerLogoPremium,
    headerLogoPrestige,
    headerLogoMobileWhite,
    headerLogoMobileBlack,
    headerLoginLabel,
    headerLogoutLabel,
    childrenContentfulHeaderHeaderLinksJsonNode,
  } = data.contentfulHeader;

  const isDesktop = useApplyAfterWidth(833);

  let logoImage;
  if (variant === "prestige") {
    logoImage = isDesktop ? headerLogoPrestige : headerLogoMobileWhite;
  } else if (variant === "premium") {
    logoImage = isDesktop ? headerLogoPremium : headerLogoMobileWhite;
  } else if (variant === "home") {
    logoImage = isDesktop ? headerLogoHome : headerLogoMobileWhite;
  } else {
    logoImage = isDesktop ? headerLogo : headerLogoMobileBlack;
  }

  const [headerStyle, setHeaderStyle] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const closeModal = useCallback(() => {
    setIsMenuActive(false);
  }, [setIsMenuActive]);

  useScrollPosition(
    ({ currPos }) => {
      const isVisible = window.innerHeight < Math.abs(currPos.y);
      isVisible ? setHeaderStyle(true) : setHeaderStyle(false);
    },
    [headerStyle]
  );

  const isStickyHeaderMobile = isStickyHeader || headerStyle ? (isDesktop ? null : headerLogoMobileBlack) : null;
  return (
    <div
      className={`absolute w-full pl-27px pr-22px md:px-20px z-100 ${className} ${
        isStickyHeader || headerStyle ? "header-show" : ""
      } ${isStickyHeader ? "header-border" : ""}`}
    >
      <div className="justify-between mx-auto flex pt-20px md:pt-5px mb-10px md:pb-5px">
        <UniversalLink link={logoLink} className={`${isDesktop ? "mt-24px" : "mt-13px"}`}>
          <Image
            image={isStickyHeader || headerStyle ? (isDesktop ? headerLogo : headerLogoMobileBlack) : logoImage}
            className={`${isStickyHeaderMobile ? " w-194px" : ""}`}
          />
        </UniversalLink>
        <button
          onClick={() => setIsMenuActive(!isMenuActive)}
          className={`button-circle-shadow rounded-full w-45px h-45px md:w-68px md:h-65px ${
            variant === "prestige" || variant === "premium" ? "bg-white-pink" : "burger-menu-not-active-bg"
          } mt-8px mb-8px mr-3px`}
        >
          <img src={BurgerMenuNotActiveImage} alt="button-icon" className="mx-auto" />
        </button>
        <BurgerMenu
          modalIsOpen={isMenuActive ? true : false}
          onClose={closeModal}
          headerLoginLabel={headerLoginLabel}
          headerLogoutLabel={headerLogoutLabel}
          headerLinks={childrenContentfulHeaderHeaderLinksJsonNode}
          isStickyHeaderMobile={isStickyHeaderMobile}
        />
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
