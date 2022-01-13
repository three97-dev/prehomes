import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import classNames from "classnames";

import Image from "../basic/image/Image";
import Markdown from "../basic/markdown/Markdown";

import UniversalLink from "../../utils/UniversalLink";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import facebookIcon from "../../assets/footer/logo-facebook.svg";
import twitterIcon from "../../assets/footer/logo-twitter.svg";
import linkedInIcon from "../../assets/footer/logo-linkedin.svg";

import "./Footer.css";

const Footer = ({ className }) => {
  const isDesktop = useApplyAfterWidth(833);
  const data = useStaticQuery(graphql`
    query FooterQuery {
      contentfulFooter(isTemplateSample: { ne: true }) {
        footerImage {
          ...Image
        }
        footerImageMobile {
          ...Image
        }
        addressBlockText
        address {
          raw
        }
        disclaimer {
          raw
        }
        socialMediaText
        contactUs {
          raw
        }
        facebook
        twitter
        linkedin
      }
    }
  `);

  const {
    footerImage,
    footerImageMobile,
    addressBlockText,
    address,
    disclaimer,
    socialMediaText,
    contactUs,
    facebook,
    twitter,
    linkedin,
  } = data.contentfulFooter;

  return (
    <div
      className={classNames(
        "bg-black-gray w-full px-25px md:px-120px pt-50px md:pt-65px pb-70px md:pb-60px",
        className
      )}
    >
      <div>
        <div className="pb-20px">{isDesktop ? <Image image={footerImage} /> : <Image image={footerImageMobile} />}</div>
        <div className="footer-grid-area">
          <div className="footer-grid-address-area">
            <div className="text-11px md:text-13px leading-24px md:leading-19px text-white font-poppins font-bold pb-25px">
              {addressBlockText}
            </div>
            <div>
              <Markdown
                data={address}
                config={{
                  p: "text-11px md:text-13px leading-24px md:leading-19px text-white font-poppins font-bold",
                }}
              />
            </div>
          </div>
          <div className="footer-grid-disclaimer-area pt-40px md:pt-0px">
            <Markdown
              data={disclaimer}
              config={{
                p: "text-11px md:text-13px leading-24px md:leading-19px text-white font-poppins font-bold mb-24px",
              }}
            />
          </div>
          <div className="footer-grid-social-media-area pt-16px md:pt-0px">
            <div className="text-11px md:text-13px leading-24px md:leading-19px text-white font-poppins font-bold pb-19px">{socialMediaText}</div>
            <div className="pb-26px">
              <UniversalLink link={facebook}>
                <img src={facebookIcon} className="inline-block mr-20px" />
              </UniversalLink>
              <UniversalLink link={twitter}>
                <img src={twitterIcon} className="inline-block mr-20px" />
              </UniversalLink>
              <UniversalLink link={linkedin}>
                <img src={linkedInIcon} className="inline-block" />
              </UniversalLink>
            </div>
          </div>
          <div className="footer-grid-contact-us-area">
            <Markdown
              data={contactUs}
              config={{
                p: "text-11px md:text-13px leading-24px md:leading-19px text-white font-poppins font-bold",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
