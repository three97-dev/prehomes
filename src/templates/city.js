import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  HeroSectionSlider,
  TextImageSection,
  TextSection,
  ThreeStatsSection,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
} from "../components";

const CityPageTemplate = ({ data }) => {
  const cityPageData = data.contentfulCityPage;
  const city = data.contentfulCity;
  const newestReleasesProjects = data.newestReleasesProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const developmentsByCityLinks = data.developmentsByCityLinks.links.columns;
  const condoProjects = data.condoProjects.nodes;
  const townhouseProjects = data.townhouseProjects.nodes;
  const detachedProjects = data.detachedProjects.nodes;

  return (
    <>
      <Header className="bg-white-pink md:bg-transparent" />
      <HeroSectionSlider
        images={city.cityImages}
        topText={cityPageData.heroTopText}
        title={city.cityName}
        subtitle={city.citySubtitleText}
        isCity
        isFixedHeader
      />
        <div className="md+:hidden border-t-2 border-gray-border w-full mb-40px"></div>
      <div className="lg:px-120px pb-40px lg:pb-0px bg-white-pink md:bg-transparent">
        <TextImageSection content={city.overviewText} image={city.overviewImage} />
        <TextSection content={city.additionalDescription} className="mt-20px px-25px lg:px-0px" />
        <ThreeStatsSection
          statOneLabel={cityPageData.averageCondoPrice}
          statOneValue={`$${city.averageCondoPrice.toLocaleString()}`}
          statTwoLabel={cityPageData.averageTownhomePrice}
          statTwoValue={`$${city.averageDetachedPrice.toLocaleString()}`}
          statThreeLabel={cityPageData.averageDetachedPrice}
          statThreeValue={`$${city.averageTownhomePrice.toLocaleString()}`}
          className="px-25px lg:0-px pb-40px"
        />
      </div>
      <div className="border-t mx-120px border-white-pink"></div>
      <div className="double-slider-small-tiles-background">
        <SliderSmallTiles
          arrowsColor="black-gray-2"
          mainTitle={cityPageData.newestReleasesSliderTitle}
          showHelpMark={true}
          smallTileData={newestReleasesProjects}
          bgWrapperClasses="bg-transparent"
          paddingTitleClasses="pt-40px"
          paddingSliderClasses="pt-70px"
        />
        <SliderSmallTiles
          arrowsColor="black-gray-2"
          mainTitle={cityPageData.launchingSoonSliderTitle}
          showHelpMark={true}
          smallTileData={launchingSoonProjects}
          bgWrapperClasses="bg-transparent"
          paddingTitleClasses="pt-70px"
          paddingSliderClasses="pt-70px pb-50px"
        />
      </div>
      <ViewByLinks title={cityPageData.viewByLinksTitle} links={developmentsByCityLinks} />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle={`${city.cityName} ${cityPageData.condoDevelopmentsSliderTitle}`}
        smallTileData={condoProjects}
        bgWrapperClasses="bg-transparent"
        paddingTitleClasses="pt-95px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle={`${city.cityName} ${cityPageData.townhouseDevelopmentsSliderTitle}`}
        smallTileData={townhouseProjects}
        bgWrapperClasses="bg-transparent"
        paddingTitleClasses="pt-95px"
        paddingSliderClasses="pt-70px"
      />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle={`${city.cityName} ${cityPageData.detachedDevelopmentsSliderTitle}`}
        smallTileData={detachedProjects}
        bgWrapperClasses="bg-transparent"
        paddingTitleClasses="pt-70px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};

export default CityPageTemplate;

export const query = graphql`
  query CityTemplate($city_contentful_id: String!) {
    contentfulCityPage(isTemplateSample: { ne: true }) {
      heroTopText
      averageCondoPrice
      averageTownhomePrice
      averageDetachedPrice
      newestReleasesSliderTitle
      launchingSoonSliderTitle
      viewByLinksTitle
      condoDevelopmentsSliderTitle
      townhouseDevelopmentsSliderTitle
      detachedDevelopmentsSliderTitle
    }
    contentfulCity(contentful_id: { eq: $city_contentful_id }) {
      cityName
      cityImages {
        ...Image
      }
      citySubtitleText
      overviewText {
        raw
      }
      overviewImage {
        ...Image
      }
      additionalDescription {
        raw
      }
      averageCondoPrice
      averageDetachedPrice
      averageTownhomePrice
    }
    newestReleasesProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        fields: { projectStatus: { eq: "newest-releases" } }
      }
    ) {
      nodes {
        contentful_id
        projectPreviewImage {
          ...SearchImage
        }
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
      }
    }
    launchingSoonProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        fields: { projectStatus: { eq: "launching-soon" } }
      }
    ) {
      nodes {
        contentful_id
        projectPreviewImage {
          ...SearchImage
        }
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
      }
    }
    developmentsByCityLinks: contentfulViewByLinks(
      isTemplateSample: { ne: true }
      contentful_id: { eq: "2S8Kg18rPYTpffWMMJmuzN" }
    ) {
      links {
        columns {
          label
          url
        }
      }
    }
    condoProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        projectType: { type: { eq: "condo" } }
      }
    ) {
      nodes {
        contentful_id
        projectPreviewImage {
          ...SearchImage
        }
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
      }
    }
    townhouseProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        projectType: { type: { eq: "townhouse" } }
      }
    ) {
      nodes {
        contentful_id
        projectPreviewImage {
          ...SearchImage
        }
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
      }
    }
    detachedProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        projectType: { type: { eq: "detached" } }
      }
    ) {
      nodes {
        contentful_id
        projectPreviewImage {
          ...SearchImage
        }
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
      }
    }
  }
`;
