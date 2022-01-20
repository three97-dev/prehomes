import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import classNames from "classnames";

import UniversalLink from "../../utils/UniversalLink";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";
import socialMediaLinks from "../../config/socialMediaLinks";

import facebookIcon from "../../assets/footer/logo-facebook.svg";
import twitterIcon from "../../assets/footer/logo-twitter.svg";
import linkedInIcon from "../../assets/footer/logo-linkedin.svg";

import "./Footer.css";

const Footer = ({ className }) => {
  const isDesktop = useApplyAfterWidth(833);

  return (
    <div
      className={classNames(
        "bg-black-gray w-full px-25px md:px-120px pt-50px md:pt-65px pb-70px md:pb-60px",
        className
      )}
    >
      <div>
        <div className="pb-20px">
          {isDesktop ? (
            <StaticImage src="../../assets/footer/logo.png" alt="logo" />
          ) : (
            <StaticImage src="../../assets/footer/logoMobile.png" alt="logo" />
          )}
        </div>
        <div className="footer-grid-area">
          <div className="footer-grid-address-area">
            <div className="footer-font text-white pb-25px">We’re here to help you find your perfect, new home</div>
            <div>
              <p className="footer-font text-white">685 Sheppard Avenue East</p>
              <p className="footer-font text-white">Box# 401</p>
              <p className="footer-font text-white">Toronto, Ontario</p>
              <p className="footer-font text-white">M2K1B6</p>
            </div>
          </div>
          <div className="footer-grid-disclaimer-area pt-40px md:pt-0px">
            <div className="footer-font text-white">
              <p className="footer-font text-white mb-24px">Disclaimer</p>
              <p className="footer-font text-white">
                PreHomes makes every effort to ensure accurate information, however, PreHomes is not liable for the use
                or misuse of the site's information. The information displayed on www.prehomes.ca is for reference only,
                it is not intended nor does it take the place of legal, tax or accounting advice.
              </p>
            </div>
          </div>
          <div className="footer-grid-social-media-area pt-16px md:pt-0px">
            <div className="footer-font text-white pb-19px">Prehomes on Social Media</div>
            <div className="pb-26px">
              <UniversalLink link={socialMediaLinks.facebook}>
                <img src={facebookIcon} className="inline-block mr-20px" alt="facebook" />
              </UniversalLink>
              <UniversalLink link={socialMediaLinks.twitter}>
                <img src={twitterIcon} className="inline-block mr-20px" alt="twitter" />
              </UniversalLink>
              <UniversalLink link={socialMediaLinks.linkedin}>
                <img src={linkedInIcon} className="inline-block" alt="linkedin" />
              </UniversalLink>
            </div>
          </div>
          <div className="footer-grid-contact-us-area">
            <div>
              <p className="footer-font text-white">Contact Us</p>
              <p className="footer-font text-white">1-833-ZADEGAN</p>
              <p className="footer-font text-white">hello@prehomes.ca</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
