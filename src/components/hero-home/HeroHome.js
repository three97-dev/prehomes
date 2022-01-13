import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, navigate } from "gatsby";

import HomeHeroInput from "../basic/home-hero-input/HomeHeroInput";
import Image from "../basic/image/Image";
import ModalVideo from "../modal-video/ModalVideo";

import UniversalLink from "../../utils/UniversalLink";

import facebookIcon from "../../assets/home/logo-facebook.svg";
import twitterIcon from "../../assets/home/logo-twitter.svg";
import linkedInIcon from "../../assets/home/logo-linkedin.svg";

import facebookIconMobile from "../../assets/home-mobile/logo-facebook.svg";
import twitterIconMobile from "../../assets/home-mobile/logo-twitter.svg";
import linkedInIconMobile from "../../assets/home-mobile/logo-linkedin.svg";

import "./HeroHome.css";

const HeroHome = ({ image, title, placeholder, bottomText, bottomTextUnderline, className }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const data = useStaticQuery(graphql`
    query HeroSocialLinksQuery {
      contentfulFooter(isTemplateSample: { ne: true }) {
        facebook
        twitter
        linkedin
      }
    }
  `);
  const { facebook, twitter, linkedin } = data.contentfulFooter;

  return (
    <div className={`z-20 w-full bg-cream-white ${className}`}>
      <div className="relative z-20 justify-end mx-auto h-screen">
        <div className="absolute flex justify-end w-full">
          <Image image={image} className="home-hero-image absolute min-w-700px w-full -z-10 right-0px h-screen" />
        </div>
        <div className="absolute home-header-white-section hidden md:block"></div>
        <div className="absolute block md:hidden bg-black w-full h-full bg-opacity-75"></div>
        <div className="absolute home-hero-title px-25px md:px-0px w-full z-100 md:pl-120px">
          <div className="relative text-47px md:text-53px leading-54px md:leading-61px font-late-november md:w-540px mb-45px md:mb-16px text-center md:text-left text-cream-pink md:text-light-pink">
            {title}
          </div>
          <HomeHeroInput placeholder={placeholder} className="relative md:max-w-632px md:-ml-20px" />
        </div>
        <div className="relative h-full min-h-600px">
          <div className="absolute md:static flex flex-col bottom-80px home-hero-links">
            <div className="md:absolute flex justify-around md:flex-col bottom-20px left-20px order-last md:order-none">
              <UniversalLink link={facebook}>
                <img className="hidden md:block" src={facebookIcon} />
                <img className="block md:hidden" src={facebookIconMobile} />
              </UniversalLink>
              <UniversalLink link={twitter} className="md:my-40px">
                <img className="hidden md:block" src={twitterIcon} />
                <img className="block md:hidden" src={twitterIconMobile} />
              </UniversalLink>
              <UniversalLink link={linkedin}>
                <img className="hidden md:block" src={linkedInIcon} />
                <img className="block md:hidden" src={linkedInIconMobile} />
              </UniversalLink>
            </div>
            <div
              onClick={() => (modalIsOpen ? setIsOpen(false) : setIsOpen(true))}
              className="flex mx-auto md:absolute cursor-pointer bottom-18px left-122px tracking-tight text-white md:text-light-pink mb-40px md:mb-0px text-11px md:text-13px leading-24px md:leading-19px font-poppins font-bold text-center"
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
