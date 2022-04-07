import React, { useCallback, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

import BurgerMenu from "../burger-menu/BurgerMenu";

import UniversalLink from "../../utils/UniversalLink";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import BurgerMenuNotActiveImage from "../../assets/header/burger-menu-inactive.svg";

import "./Header.css";

const Header = ({ logoLink, variant, isStickyHeader, className }) => {
  const isDesktop = useApplyAfterWidth(833);

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

  const isStickyHeaderMobile =
    isStickyHeader || headerStyle ? (
      isDesktop ? null : (
        <StaticImage src="../../assets/header/header-logo-mobile-black.png" className="w-194px" />
      )
    ) : null;

  const imageClassName = isStickyHeaderMobile ? " w-194px" : "";
  const altText = "logo";

  let logoImage;
  if (variant === "prestige") {
    logoImage = isDesktop ? (
      <StaticImage src="../../assets/header/header-logo-prestige.png" className={imageClassName} alt={altText} />
    ) : (
      <StaticImage src="../../assets/header/header-logo-mobile-white.png" className={imageClassName} alt={altText} />
    );
  } else if (variant === "premium") {
    logoImage = isDesktop ? (
      <StaticImage src="../../assets/header/header-logo-premium.png" className={imageClassName} alt={altText} />
    ) : (
      <StaticImage src="../../assets/header/header-logo-mobile-white.png" className={imageClassName} alt={altText} />
    );
  } else if (variant === "home") {
    logoImage = isDesktop ? (
      <StaticImage src="../../assets/header/header-logo-home.png" className={imageClassName} alt={altText} />
    ) : (
      <StaticImage src="../../assets/header/header-logo-home.png" className={imageClassName} alt={altText} />
    );
  } else {
    logoImage = isDesktop ? (
      <StaticImage src="../../assets/header/header-logo.png" className={imageClassName} alt={altText} />
    ) : (
      <StaticImage src="../../assets/header/header-logo.png" className={imageClassName} alt={altText} />
    );
  }

  return (
    <div
      className={`absolute w-full px-25px md:px-16px z-100 py-16px ${className} ${
        isStickyHeader || headerStyle ? "header-show" : ""
      } ${isStickyHeader ? "header-border" : ""}`}
    >
      <div className="justify-between items-center mx-auto flex">
        <UniversalLink link={logoLink}>
          {isStickyHeader || headerStyle ? (
            isDesktop ? (
              <StaticImage src="../../assets/header/header-logo-home.png" className={imageClassName} alt={altText} />
            ) : (
              <StaticImage src="../../assets/header/header-logo.png" className={imageClassName} alt={altText} />
            )
          ) : (
            logoImage
          )}
        </UniversalLink>
        <button
          onClick={() => setIsMenuActive(!isMenuActive)}
          className={`button-circle-shadow rounded-full w-40px h-40px  ${
            variant === "prestige" || variant === "premium" ? "bg-white-pink" : "burger-menu-not-active-bg"
          } mr-3px`}
        >
          <img src={BurgerMenuNotActiveImage} alt="button-icon" className="mx-auto" />
        </button>
        <BurgerMenu modalIsOpen={isMenuActive ? true : false} onClose={closeModal} />
      </div>
    </div>
  );
};

Header.propTypes = {
  image: PropTypes.object,
  logoLink: PropTypes.string,
  isStickyHeader: PropTypes.bool,
  variant: PropTypes.oneOf(["prestige", "premium", "home"]),
  className: PropTypes.string,
};

Header.defaultProps = {
  image: {},
  logoLink: "/",
  isStickyHeader: false,
  className: "",
};

export default Header;
