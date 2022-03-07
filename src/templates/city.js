import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  HeroSectionSlider,
  TextMapSection,
  TextSection,
  ThreeStatsSection,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
} from "../components";

import { spliceIntoChunks } from "../utils/spliceIntoChunks";
// import Seo from "../seo/Seo";

const CityPageTemplate = ({ data }) => {
  const city = data.contentfulCity;
  const platinumAccessProjects = data.platinumAccessProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const projectsByCityLinks = spliceIntoChunks(data.projectsByCityLinks.nodes);
  const condoProjects = data.condoProjects.nodes;
  const townhouseProjects = data.townhouseProjects.nodes;
  const detachedProjects = data.detachedProjects.nodes;

  return (
    <>
      {/* <Seo
        seo={{
          seoTitle: city.cityName,
          seoDescription: city.citySubtitleText,
        }}
      /> */}
      <Header />
      <HeroSectionSlider
        images={city.cityImages}
        topText="City View"
        title={city.cityName}
        subtitle={city.citySubtitleText}
        isCity
        isFixedHeader
        className="bg-transparent"
      />
      <div className="md+:hidden border-t-2 border-gray-border w-full mt-15px mb-30px"></div>
      <div className="lg:px-120px md:pb-35px md+:pt-75px">
        <TextMapSection
          title={`Why invest In ${city.cityName}`}
          content={city.additionalDescription}
          mapZoom={9}
          centerPosition={city.cityLocation}
          className="pb-50px md:pb-0px"
          textSectionStyle="pt-20px"
        />
        <TextSection
          title={`Things To Do In ${city.cityName}`}
          content={city.thingsToDo}
          className="mt-0px md+:mt-100px px-25px lg:px-0px md+:pb-0px"
        />
        <TextSection
          title={`Education & Employment In ${city.cityName}`}
          content={city.educationEmployment}
          className="mt-0px md+:mt-100px px-25px lg:px-0px md+:pb-0px"
        />
        <TextSection
          title={`Transit & Connectivity In ${city.cityName}`}
          content={city.transitConnectivity}
          className="mt-0px md+:mt-100px px-25px lg:px-0px md+:pb-0px"
        />
        <ThreeStatsSection
          statOneLabel="Average Condo Price"
          statOneValue={`$${city.averageCondoPrice ? city.averageCondoPrice.toLocaleString() : ""}`}
          statTwoLabel="Average Townhome Price"
          statTwoValue={`$${city.averageDetachedPrice ? city.averageDetachedPrice.toLocaleString() : ""}`}
          statThreeLabel="Average Detached Price"
          statThreeValue={`$${city.averageTownhomePrice ? city.averageTownhomePrice.toLocaleString() : ""}`}
          className="px-25px lg:0-px"
        />
      </div>
      <hr className="bg-beige h-2px border-none bg-clip-content md:mx-25px lg:mx-120px mt-50px md:mt-10px mb-10px md:mb-0px" />
      <div className="double-slider-small-tiles-background">
        <SliderSmallTiles
          arrowsColor="black-gray-2"
          mainTitle="Platinum Access"
          helpMarkTooltip="Newest Releases Slider Tooltip"
          showHelpMark={true}
          smallTileData={platinumAccessProjects}
          bgWrapperClasses="bg-transparent"
          paddingTitleClasses="pt-40px"
          paddingSliderClasses="pt-70px"
        />
        <SliderSmallTiles
          arrowsColor="black-gray-2"
          mainTitle="Launching Soon"
          helpMarkTooltip="Launching Soon Slider Tooltip"
          showHelpMark={true}
          smallTileData={launchingSoonProjects}
          bgWrapperClasses="bg-transparent"
          paddingTitleClasses="pt-50px md:pt-70px"
          paddingSliderClasses="pt-70px pb-50px"
        />
      </div>
      <ViewByLinks title="View Projects by City:" links={projectsByCityLinks} />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle={`${city.cityName} Condo Developments`}
        smallTileData={condoProjects}
        bgWrapperClasses="bg-transparent"
        paddingTitleClasses="pt-50px md:pt-95px"
        paddingSliderClasses="pt-70px"
      />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle={`${city.cityName} Townhouse Developments`}
        smallTileData={townhouseProjects}
        bgWrapperClasses="bg-transparent"
        paddingTitleClasses="pt-50px md:pt-95px"
        paddingSliderClasses="pt-70px"
      />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle={`${city.cityName} Detached Developments`}
        smallTileData={detachedProjects}
        bgWrapperClasses="bg-transparent"
        paddingTitleClasses="pt-50px md:pt-70px"
        paddingSliderClasses="pt-70px"
      />
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};

export default CityPageTemplate;

export const query = graphql`
  query CityTemplate($city_contentful_id: String!) {
    contentfulCity(contentful_id: { eq: $city_contentful_id }) {
      cityName
      cityImages {
        ...Image
      }
      citySubtitleText
      cityLocation {
        lat
        lon
      }
      additionalDescription {
        raw
      }
      thingsToDo {
        raw
      }
      educationEmployment {
        raw
      }
      transitConnectivity {
        raw
      }
      averageCondoPrice
      averageDetachedPrice
      averageTownhomePrice
    }
    platinumAccessProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        fields: { projectStatus: { eq: "platinum-access" } }
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
          projectMinPrice
        }
      }
    }
    launchingSoonProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
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
          projectMinPrice
        }
      }
    }
    projectsByCityLinks: allContentfulCity(limit: 16, sort: { fields: cityName, order: ASC }) {
      nodes {
        label: cityName
        url: fields {
          pageUrl
        }
      }
    }
    condoProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        projectType: { name: { eq: "Condo" } }
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
          projectMinPrice
        }
      }
    }
    townhouseProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        projectType: { name: { eq: "Townhouse" } }
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
          projectMinPrice
        }
      }
    }
    detachedProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        projectCity: { contentful_id: { eq: $city_contentful_id } }
        projectType: { name: { eq: "Detached" } }
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
          projectMinPrice
        }
      }
    }
  }
`;
