import React from "react";
import PropTypes from "prop-types";

import Text from "../basic/text/Text";
import UniversalLink from "../../../utils/UniversalLink";

import Image from "../basic/image/Image";
import LogoLinkedin from "../../../assets/old_assets/pages/footer/linkedin-footer-mobile.svg";
import LogoFacebook from "../../../assets/old_assets/pages/footer/facebook-footer-mobile.svg";
import LogoInstagram from "../../../assets/old_assets/pages/footer/instagram-footer-mobile.svg";

import "./Footer.css";

const Footer = ({
  links,
  subtitle,
  facebookLink,
  instagramLink,
  linkedInLink,
  copyright,
  address,
  logo,
  className,
  ...otherProps
}) => {
  return (
    <div
      className={`grid footer-grid-mobile md:footer-grid-tablet lg:footer-grid-web xl:footer-grid-webhd bg-footer-bg ${className}`}
      {...otherProps}
    >
      <UniversalLink link="/" className="footer-image-area mx-auto md:mx-0px md:mt-4px mb-28px md:mb-0px">
        <Image image={logo} className="md:w-168px" width="154" height="40" />
      </UniversalLink>
      <div className="links-block-area justify-self-end md:-mt-3px lg:-mt-2px mx-auto md:mx-0px mb-48px md:mb-0px md:ml-50px md:mr-39px lg:mr-51px xl:mr-143px">
        {links.map((link, i) => (
          <UniversalLink link={link.link} key={i}>
            <Text typography="footer" className="typography-body cursor-pointer text-center md:text-left mt-5px">
              {link.label}
            </Text>
          </UniversalLink>
        ))}
      </div>
      <div className="subtitle-block-area items-start w-312px md:w-full mx-auto text-center md:text-left mb-44px md:mb-0px">
        <Text typography="footer">{subtitle}</Text>
      </div>
      <div className="address-block-area hidden md:block lg:mt-3px xl:mt-4px">
        <Text typography="footer">{address}</Text>
      </div>
      <div className="social-block-area flex justify-between items-start mb-50px md:mb-15px mx-auto md:mx-0px w-160px md:w-166px lg:w-76px md:mt-8px lg:mt-12px md:-ml-12px lg:ml-0px">
        <UniversalLink link={facebookLink}>
          <img src={LogoFacebook} alt="LogoFacebook" className="h-28px lg:h-14px w-28px lg:w-14px" />
        </UniversalLink>
        <UniversalLink link={instagramLink}>
          <img src={LogoInstagram} alt="LogoInstagram" className="h-28px lg:h-14px w-28px lg:w-14px" />
        </UniversalLink>
        <UniversalLink link={linkedInLink}>
          <img src={LogoLinkedin} alt="LogoLinkedin" className="h-28px lg:h-14px w-28px lg:w-14px" />
        </UniversalLink>
      </div>
      <div className="opacity-30 copyright-block-area items-end text-center mx-36px md:mx-auto md:w-full border-t border-fontcolor-footer">
        <Text typography="footer" color="text-fontcolor-footer" className="my-15px">
          {copyright}
        </Text>
      </div>
    </div>
  );
};

Footer.propTypes = {
  links: PropTypes.array,
  copyright: PropTypes.string,
  address: PropTypes.string,
  className: PropTypes.string,
  subtitle: PropTypes.string,
  facebookLink: PropTypes.string,
  instagramLink: PropTypes.string,
  linkedInLink: PropTypes.string,
};

Footer.defaultProps = {
  links: [],
  copyright: "some copyright",
  address: "some address",
  subtitle: "some subtitle",
  className: "",
  facebookLink: "/",
  instagramLink: "/",
  linkedInLink: "/",
};

export default Footer;
