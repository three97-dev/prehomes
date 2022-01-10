import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Footer from "./Footer";

const SiteFooter = () => {
  // const data = useStaticQuery(graphql`
  //   query FooterQuery {
  //     contentfulFooterConfig(contentful_id: { eq: "6OEs29FewA4bdvFxbUsAKn" }) {
  //       logo {
  //         ...Image
  //       }
  //       copyright
  //       address
  //       links {
  //         label
  //         link
  //       }
  //       subtitle
  //       facebookLink
  //       instagramLink
  //       linkedInLink
  //     }
  //   }
  // `);
  const data = {};

  return (
    <Footer
      links={data.contentfulFooterConfig.links}
      copyright={data.contentfulFooterConfig.copyright}
      address={data.contentfulFooterConfig.address}
      logo={data.contentfulFooterConfig.logo}
      subtitle={data.contentfulFooterConfig.subtitle}
      facebookLink={data.contentfulFooterConfig.facebookLink}
      instagramLink={data.contentfulFooterConfig.instagramLink}
      linkedInLink={data.contentfulFooterConfig.linkedInLink}
    />
  );
};

export default SiteFooter;
