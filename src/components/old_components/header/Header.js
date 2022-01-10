import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";

import UniversalLink from "../../../utils/UniversalLink";
import Image from "../basic/image/Image";

import SendButtonIcon from "../../../assets/old_assets/header/send.svg";
import SendButtonMobileIcon from "../../../assets/old_assets/header/send-mobile.svg";
import BurgerIcon from "../../../assets/old_assets/header/burger.svg";
import BurgerIconDark from "../../../assets/old_assets/header/burger-dark.svg";

import "./Header.css";

function equalUrls(urlA = "", urlB = "") {
  // drop last / in url
  if (urlA.endsWith("/")) {
    urlA = urlA.slice(0, urlA.length - 1);
  }
  if (urlB.endsWith("/")) {
    urlB = urlB.slice(0, urlB.length - 1);
  }
  return urlA === urlB;
}

const Header = ({ isInverted, links, logoLink, logoMobile, logoDesktop, sendButtonLink, burgerMenuLinks }) => {
  const { pathname } = useLocation();
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const triggerShowBurgerMenu = () => {
    setShowBurgerMenu(!showBurgerMenu);
  };

  useEffect(() => {
    if (showBurgerMenu) {
      document.body.style.overflowY = "hidden";
      document.body.style.position = "fixed";
    }

    return function cleanup() {
      if (showBurgerMenu) {
        document.body.style.overflowY = "scroll";
        document.body.style.position = null;
      }
    };
  }, [showBurgerMenu]);

  const textColor = isInverted ? "text-white" : "text-tile-bg-4";

  return (
    <div className="absolute top-0px z-100 grid w-full header-mobile-grid md:header-tablet-grid md+:header-desktop-grid lg+:header-hd-grid items-center md:items-start md+:items-center mt-22px md:mt-30px md+:mt-0px">
      <UniversalLink link={logoLink} className="header-logo-area focus-visible:header-focus-outline">
        <Image image={logoMobile} className="md:hidden" width="52" height="44" />
        <Image image={logoDesktop} className="hidden md:block" />
      </UniversalLink>
      <div className="header-links-area justify-end gap-x-49px lg+:gap-92px hidden md+:flex">
        {links.map((link, i) => (
          <UniversalLink link={link.link} key={i}>
            <div
              className={`typography-body cursor-pointer hover:text-coral-red focus-visible:header-focus-outline focus-visible:text-coral-red ${
                equalUrls(pathname, link.link) ? "text-coral-red" : textColor
              }`}
            >
              {link.label}
            </div>
          </UniversalLink>
        ))}
      </div>

      <button onClick={triggerShowBurgerMenu} className="header-burger-area md+:hidden">
        <img src={isInverted ? BurgerIcon : BurgerIconDark} alt="burger-menu" />
      </button>

      <UniversalLink
        link={sendButtonLink}
        className="header-send-button-area hidden md+:block focus:header-focus-outline"
      >
        <img src={SendButtonIcon} alt="send" className="h-103px md+:h-104px" />
      </UniversalLink>

      {/* Burger Menu */}
      <div
        className={`fixed top-0px left-0px w-full h-full z-20 ${
          showBurgerMenu ? "header-modal-visible" : "header-modal-hidden"
        }`}
      />
      <div
        className={`${
          showBurgerMenu ? "header-slide-to-left" : "header-slide-back"
        } grid fixed top-0px w-full header-modal-mobile-grid sm+:header-modal-tablet-grid md+:hidden overflow-y-scroll -right-full z-30 h-full`}
      >
        <div className="grid md+:hidden header-burger-menu-area header-burger-mobile-grid sm+:header-burger-tablet-grid h-full bg-white">
          <div className="header-burger-menu-icon-area grid">
            <button
              className="justify-self-end mt-30px h-26px focus:outline-none focus-visible:header-mobile-button"
              onClick={triggerShowBurgerMenu}
            >
              <img src={BurgerIconDark} alt="menu" />
            </button>
          </div>

          <div className="grid header-burger-menu-links-area justify-items-center content-center">
            {burgerMenuLinks.map((link, index) => (
              <UniversalLink
                link={link.link}
                key={index}
                className={`grid justify-items-center py-20px sm+:py-29px w-full ${
                  index === burgerMenuLinks.length - 1 ? "" : "border-b-2 border-line-color"
                }`}
              >
                <div
                  typography="body"
                  className={`${
                    equalUrls(pathname, link.link) ? "text-coral-red" : "text-tile-bg-4"
                  } typography-body focus-visible:header-focus-outline focus-visible:text-coral-red`}
                >
                  {link.label}
                </div>
              </UniversalLink>
            ))}
          </div>

          <UniversalLink link={sendButtonLink} className="justify-self-end header-burger-menu-send-button-area">
            <img src={SendButtonMobileIcon} alt="send" />
          </UniversalLink>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  sendButtonLink: PropTypes.any,
  isInverted: PropTypes.bool,
  links: PropTypes.array,
  burgerMenuLinks: PropTypes.array,
};

Header.defaultProps = {
  sendButtonLink: "/",
  isInverted: false,
  links: [
    { link: "/", label: "About" },
    { link: "/", label: "CRM" },
    { link: "/", label: "Analytics" },
    { link: "/", label: "Blog" },
    { link: "/", label: "Contact" },
  ],
  burgerMenuLinks: [
    { link: "/", label: "About" },
    { link: "/", label: "CRM" },
    { link: "/", label: "Analytics" },
    { link: "/", label: "Blog" },
    { link: "/", label: "Contact" },
  ],
};

export default Header;
