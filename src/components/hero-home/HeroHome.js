import React, { useState } from "react";
import PropTypes from "prop-types";

import HomeHeroInput from "../basic/home-hero-input/HomeHeroInput";
import ModalVideo from "../modal-video/ModalVideo";

import UniversalLink from "../../utils/UniversalLink";
import socialMediaLinks from "../../config/socialMediaLinks";

import facebookIcon from "../../assets/home/logo-facebook.svg";
import twitterIcon from "../../assets/home/logo-twitter.svg";
import linkedInIcon from "../../assets/home/logo-linkedin.svg";
import facebookIconMobile from "../../assets/home-mobile/logo-facebook.svg";
import twitterIconMobile from "../../assets/home-mobile/logo-twitter.svg";
import linkedInIconMobile from "../../assets/home-mobile/logo-linkedin.svg";

import "./HeroHome.css";

const HeroHome = ({ image, title, placeholder, bottomText, bottomTextUnderline, className }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative z-20 w-full ${className} header-background`}>
      <div className="overlay"></div>
      <div className="relative z-20 justify-end mx-92px md:ml-120px">
        <div className="flex items-center home-hero-title px-25px md:px-0px w-full z-100">
          <h1 className="flex-1 text-center md:text-left text-cream-pink md:text-white-pink leading-61px">{title}</h1>
          <div className="flex-1 relative p-16px">
            <div className="absolute bg-mild-purple rounded-5px opacity-75 top-0px bottom-0px left-0px right-0px"></div>
            <p className="relative z-20 text-12px text-white font-pangram pl-16px pb-8px">
              Enter an address, city, neighborhood, project, or developer.
            </p>
            <HomeHeroInput placeholder={placeholder} className="relative" />
          </div>
        </div>
        <div className="h-full min-h-600px">
          <div className="absolute bottom-0px w-full flex items-center home-hero-links mb-22px">
            <div
              onClick={() => (modalIsOpen ? setIsOpen(false) : setIsOpen(true))}
              className="flex-1 mx-auto cursor-pointer tracking-tight text-white md:text-white-pink eyebrow-font"
            >
              <div className="md:underline capitalize">{bottomTextUnderline}</div>
            </div>
            <div className="flex flex-1 justify-end space-x-16px mr-30px">
              <UniversalLink link={socialMediaLinks.facebook}>
                <img className="hidden md:block" src={facebookIcon} alt="facebook" />
                <img className="block md:hidden" src={facebookIconMobile} alt="facebook" />
              </UniversalLink>
              <UniversalLink link={socialMediaLinks.twitter}>
                <img className="hidden md:block" src={twitterIcon} alt="twitter" />
                <img className="block md:hidden" src={twitterIconMobile} alt="twitter" />
              </UniversalLink>
              <UniversalLink link={socialMediaLinks.linkedin}>
                <img className="hidden md:block" src={linkedInIcon} alt="linkedIn" />
                <img className="block md:hidden" src={linkedInIconMobile} alt="linkedIn" />
              </UniversalLink>
            </div>
          </div>
        </div>
        <ModalVideo
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          modalVideoLink="https://www.youtube.com/embed/W8Sqk1GcqxY"
        />
      </div>
    </div>
  );
};

HeroHome.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  bottomText: PropTypes.string,
  className: PropTypes.string,
};

HeroHome.defaultProps = {
  image: {},
  title: "",
  placeholder: "",
  bottomText: "",
  className: "",
};

export default HeroHome;
