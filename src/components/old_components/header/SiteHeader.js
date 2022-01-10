import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./Header";

const SiteHeader = ({ isInverted }) => {
  // const data = useStaticQuery(graphql`
  //   query HeaderQuery {
  //     contentfulHeaderConfig(contentful_id: { eq: "10XQiIPsmGjraFMTI21aGj" }) {
  //       links {
  //         label
  //         link
  //       }
  //       logoLink
  //       logoMobile {
  //         ...Image
  //       }
  //       logoDesktop {
  //         ...Image
  //       }
  //       sendButtonLink
  //       burgerMenuLinks {
  //         label
  //         link
  //       }
  //     }
  //   }
  // `);
  let data = {};

  return (
    <Header
      isInverted={isInverted}
      links={data.contentfulHeaderConfig.links}
      logoLink={data.contentfulHeaderConfig.logoLink}
      logoMobile={data.contentfulHeaderConfig.logoMobile}
      logoDesktop={data.contentfulHeaderConfig.logoDesktop}
      sendButtonLink={data.contentfulHeaderConfig.sendButtonLink}
      burgerMenuLinks={data.contentfulHeaderConfig.burgerMenuLinks}
    />
  );
};

SiteHeader.propTypes = {
  isInverted: PropTypes.bool,
};

SiteHeader.defaultProps = {
  isInverted: false,
};

export default SiteHeader;
