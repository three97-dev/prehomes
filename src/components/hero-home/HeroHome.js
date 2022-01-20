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
    <div className={`z-20 w-full bg-cream-white ${className}`}>
      <div className="relative z-20 justify-end mx-auto h-screen">
        <div className="absolute flex justify-end w-full">
          {image}
        </div>
        <div className="absolute home-header-white-section hidden md:block"></div>
        <div className="absolute block md:hidden bg-black w-full h-full bg-opacity-75"></div>
        <div className="absolute home-hero-title px-25px md:px-0px w-full z-100 md:pl-120px">
          <h1 className="relative md:w-540px mb-45px md:mb-16px text-center md:text-left text-cream-pink md:text-white-pink">
            {title}
          </h1>
          <HomeHeroInput placeholder={placeholder} className="relative md:max-w-632px md:-ml-20px" />
        </div>
        <div className="relative h-full min-h-600px">
          <div className="absolute md:static flex flex-col bottom-80px home-hero-links">
            <div className="md:absolute flex justify-around md:flex-col bottom-20px left-20px order-last md:order-none">
              <UniversalLink link={socialMediaLinks.facebook}>
                <img className="hidden md:block" src={facebookIcon} alt="facebook" />
                <img className="block md:hidden" src={facebookIconMobile} alt="facebook" />
              </UniversalLink>
              <UniversalLink link={socialMediaLinks.twitter} className="md:my-40px">
                <img className="hidden md:block" src={twitterIcon} alt="twitter" />
                <img className="block md:hidden" src={twitterIconMobile} alt="twitter" />
              </UniversalLink>
              <UniversalLink link={socialMediaLinks.linkedin}>
                <img className="hidden md:block" src={linkedInIcon} alt="linkedIn" />
                <img className="block md:hidden" src={linkedInIconMobile} alt="linkedIn" />
              </UniversalLink>
            </div>
            <div
              onClick={() => (modalIsOpen ? setIsOpen(false) : setIsOpen(true))}
              className="flex mx-auto md:absolute cursor-pointer bottom-18px left-122px tracking-tight text-white md:text-white-pink mb-40px md:mb-0px eyebrow-font text-center"
            >
              <div className="mr-3px">{bottomText}</div>
              <div className="md:underline">{bottomTextUnderline}</div>
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
