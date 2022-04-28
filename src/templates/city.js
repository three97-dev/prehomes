import React, { useState, useCallback } from "react";
import { graphql } from "gatsby";

import {
  Header,
  TextMapSection,
  TextSection,
  ThreeStatsSection,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
  HeroSection,
  SliderArrow,
  Image,
} from "../components";

import { spliceIntoChunks } from "../utils/spliceIntoChunks";
import Slider from "react-slick";
import CityHeroSection from "../components/hero-section/city-hero-section/CityHeroSection";
import CitySectionSlider from "../components/city-section-slider/CitySectionSlider";

// import Seo from "../seo/Seo";

const CityPageTemplate = ({ data }) => {
  const city = data.strapiCities;
  const [hero, setHero] = useState(0);

  const platinumAccessProjects = data.platinumAccessProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const projectsByCityLinks = spliceIntoChunks(data.projectsByCityLinks.nodes);
  const condoProjects = data.condoProjects.nodes;
  const townhouseProjects = data.townhouseProjects.nodes;
  const detachedProjects = data.detachedProjects.nodes;

  const images = city.cityImages;

  return (
    <>
      {/* <Seo
        seo={{
          seoTitle: city.cityName,
          seoDescription: city.citySubtitleText,
        }}
      /> */}
      <Header />
      <HeroSection
        rightHeroContent={<CityHeroSection images={images} heroIndex={hero} />}
        heroTopText="You're exploring:"
        title={city.cityName}
        className="bg-transparent"
        viewAllLink="/cities"
        viewAllText="View all Cities"
      />
      <CitySectionSlider images={images} setHero={setHero} />
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
      <ViewByLinks viewAllLink="/cities" title="City:" links={projectsByCityLinks} />
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
  query CityTemplate($city_strapi_id: Int) {
    strapiCities(strapiId: { eq: $city_strapi_id }) {
      cityName
      cityImages {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      citySubtitleText
      cityLocation {
        lat
        lon
      }
      additionalDescription
      thingsToDo
      educationEmployment
      transitConnectivity
      averageCondoPrice
      averageDetachedPrice
      averageTownhomePrice
    }
    platinumAccessProjects: allStrapiProjects(
      filter: { isSoldOut: { eq: false }, city: { id: { eq: $city_strapi_id } } }
    ) {
      nodes {
        strapiId
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
        }
        projectName
        city {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
      }
    }
    launchingSoonProjects: allStrapiProjects(
      filter: {
        isSoldOut: { eq: false }
        city: { id: { eq: $city_strapi_id } }
        fields: { projectStatus: { eq: "launching-soon" } }
      }
    ) {
      nodes {
        strapiId
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
        }
        projectName
        city {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
      }
    }
    projectsByCityLinks: allStrapiCities(limit: 15, sort: { fields: cityName, order: ASC }) {
      nodes {
        label: cityName
        url: fields {
          pageUrl
        }
      }
    }
    condoProjects: allStrapiProjects(filter: { isSoldOut: { eq: false }, city: { id: { eq: $city_strapi_id } } }) {
      nodes {
        strapiId
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
        }
        projectName
        city {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
      }
    }
    townhouseProjects: allStrapiProjects(filter: { isSoldOut: { eq: false }, city: { id: { eq: $city_strapi_id } } }) {
      nodes {
        strapiId
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
        }
        projectName
        city {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
      }
    }
    detachedProjects: allStrapiProjects(filter: { isSoldOut: { eq: false }, city: { id: { eq: $city_strapi_id } } }) {
      nodes {
        strapiId
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
        }
        projectName
        city {
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
