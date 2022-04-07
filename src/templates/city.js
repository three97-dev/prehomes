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

import "../components/city-section/CitySection.css";
// import Seo from "../seo/Seo";

const CityPageTemplate = ({ data }) => {
  const city = data.contentfulCity;
  const [tileCount, setTileCount] = useState(0);
  const [hero, setHero] = useState(0);
  const [slider, setSlider] = useState(null);

  const platinumAccessProjects = data.platinumAccessProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const projectsByCityLinks = spliceIntoChunks(data.projectsByCityLinks.nodes);
  const condoProjects = data.condoProjects.nodes;
  const townhouseProjects = data.townhouseProjects.nodes;
  const detachedProjects = data.detachedProjects.nodes;

  const images = city.cityImages;

  const settings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    afterChange: index => images[index] && setHero(index),
    focusOnSelect: true,
    prevArrow: <SliderArrow classNames="mr-64px" />,
    nextArrow: <SliderArrow classNames="ml-64px" rotate />,
    infinite: false,
    touchMove: true,
    onInit: useCallback(() => {
      if (slider) {
        setTileCount(slider.innerSlider.props.slidesToShow);
      }
    }, [slider, setTileCount]),
    onReInit: useCallback(() => {
      if (slider.innerSlider.props.slidesToShow !== tileCount) {
        setTileCount(slider.innerSlider.props.slidesToShow);
      }
    }, [slider, tileCount, setTileCount]),
    responsive: [
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 1,
          arrows: false,
          touchMove: true,
          swipeToSlide: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 8,
        },
      },
    ],
  };

  const renderRightHeroContent = () => {
    return (
      <div className="relative w-full md:w-450px h-400px md:h-auto px-25px md:px-0px flex justify-center md:justify-start">
        <div className="absolute w-308px md:w-450px h-300px bottom-32px rounded-15px left-25px md:right-32px bg-white"></div>
        <div className="absolute w-308px md:w-450px h-300px bottom-16px rounded-15px right-25px md:right-48px border border-deep-purple"></div>
        <Image image={images[hero]} alt="City hero" className="h-300px w-308px md:w-450px rounded-8px" />
      </div>
    );
  };

  const emptyTiles = (arr, amount) => {
    if (arr.length < amount) {
      let extra = [];
      for (let i = arr.length; i < amount; i++) {
        extra.push(i);
      }
      return extra.map(index => {
        return (
          <div key={index} className="flex justify-center w-120px h-80px">
            <div className="w-full h-full mx-auto"></div>
          </div>
        );
      });
    }
  };

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
        rightHeroContent={renderRightHeroContent()}
        heroTopText="You're exploring:"
        title={city.cityName}
        className="bg-transparent"
        viewAllLink="/cities"
        viewAllText="View all Cities"
      />
      <Slider
        ref={s => setSlider(s)}
        {...settings}
        className="slider-wrapper display-flex w-full bg-light-purple px-25px md:px-120px py-35px"
      >
        {images.map((img, index) => {
          return (
            <div className="slider-container">
              <Image image={img} key={index} className="w-120px h-80px rounded-10px" />
            </div>
          );
        })}
        {emptyTiles(images, tileCount)}
      </Slider>
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
    projectsByCityLinks: allContentfulCity(limit: 15, sort: { fields: cityName, order: ASC }) {
      nodes {
        label: cityName
        url: fields {
          pageUrl
        }
      }
    }
    condoProjects: allContentfulProject(
      filter: { isSoldOut: { eq: false }, projectCity: { contentful_id: { eq: $city_contentful_id } } }
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
      filter: { isSoldOut: { eq: false }, projectCity: { contentful_id: { eq: $city_contentful_id } } }
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
      filter: { isSoldOut: { eq: false }, projectCity: { contentful_id: { eq: $city_contentful_id } } }
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
