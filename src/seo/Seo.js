import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";

import { pageToSeoObject, siteDefaultSeoToSeoObject, mergeSeo } from "./seoUtils";

import defaultSeoConfig from "../config/seoSettings.js";

const Seo = ({ seo, children }) => {
  const { pathname } = useLocation();

  const pageSEO = pageToSeoObject(seo);
  const defaultSEO = siteDefaultSeoToSeoObject(defaultSeoConfig, pathname);

  const mergedSEO = mergeSeo(defaultSEO, pageSEO);

  return (
    <>
      <Helmet
        title={mergedSEO.title}
        titleTemplate={mergedSEO.titleTemplate}
        htmlAttributes={{
          lang: "en",
        }}
      >
        <meta name="description" content={mergedSEO.description} />
        <meta name="image" content={mergedSEO.image} />

        <meta property="og:url" content={mergedSEO.url} />
        <meta property="og:title" content={mergedSEO.og_title} />
        <meta property="og:description" content={mergedSEO.og_description} />
        <meta property="og:image" content={mergedSEO.og_image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={mergedSEO.twitter_username} />
        <meta name="twitter:title" content={mergedSEO.twitter_title} />
        <meta name="twitter:description" content={mergedSEO.twitter_description} />
        <meta name="twitter:image" content={mergedSEO.twitter_image} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-178PL276KH"></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'G-178PL276KH');`}
        </script>
      </Helmet>
      {children}
    </>
  );
};

export default Seo;
