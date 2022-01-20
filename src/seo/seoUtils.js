export const pageToSeoObject = pageData => {
  const pageSEO = {
    title: pageData?.seoTitle,
    description: pageData?.seoDescription,
    image: pageData?.seoImage,

    og_title: pageData?.seoOgTitle,
    og_description: pageData?.seoOgDescription,
    og_image: pageData?.seoOgImage,

    twitter_title: pageData?.seoTwitterTitle,
    twitter_description: pageData?.seoTwitterDescription,
    twitter_image: pageData?.seoTwitterImage,
  };

  return pageSEO;
};

export const siteDefaultSeoToSeoObject = (defaultSEOFromCMS, pathname) => {
  const defaultSEO = {
    url: `${defaultSEOFromCMS?.seoSiteUrl}${pathname}`,
    titleTemplate: defaultSEOFromCMS?.seoTitleTemplate,
    title: defaultSEOFromCMS?.seoTitle,
    description: defaultSEOFromCMS?.seoDescription,
    image: defaultSEOFromCMS?.seoImage,
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
