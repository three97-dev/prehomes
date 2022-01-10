export const pageToSeoObject = pageData => {
  const pageSEO = {
    title: pageData?.seoTitle,
    description: pageData?.seoDescription?.seoDescription,
    image: pageData?.seoImage?.file?.url,

    og_title: pageData?.seoOgTitle,
    og_description: pageData?.seoOgDescription?.seoOgDescription,
    og_image: pageData?.seoOgImage?.file?.url,

    twitter_title: pageData?.seoTwitterTitle,
    twitter_description: pageData?.seoTwitterDescription?.seoTwitterDescription,
    twitter_image: pageData?.seoTwitterImage?.file?.url,
  };

  return pageSEO;
};

export const siteDefaultSeoToSeoObject = (defaultSEOFromCMS, pathname) => {
  const defaultSEO = {
    url: `${defaultSEOFromCMS?.seoSiteUrl}${pathname}`,
    titleTemplate: defaultSEOFromCMS?.seoTitleTemplate,
    title: defaultSEOFromCMS?.seoTitle,
    description: defaultSEOFromCMS?.seoDescription?.seoDescription,
    image: defaultSEOFromCMS?.seoImage?.file?.url,
    twitter_username: defaultSEOFromCMS?.seoTwitterUsername,
  };

  return defaultSEO;
};

export const mergeSeo = (...seoObjects) => {
  let resultSeo = {};
  for (let seoObject of seoObjects) {
    // clean up undefined and empty keys
    for (const key of Object.keys(seoObject)) {
      if (seoObject[key] === undefined || seoObject[key] === "") {
        delete seoObject[key];
      }
    }

    //merge seoObject into result
    resultSeo = { ...resultSeo, ...seoObject };
  }

  // apply to og and twitter present values
  resultSeo = {
    og_title: resultSeo.title,
    og_description: resultSeo.description,
    og_image: resultSeo.image,

    twitter_title: resultSeo.title,
    twitter_description: resultSeo.description,
    twitter_image: resultSeo.image,
    ...resultSeo,
  };

  return resultSeo;
};
