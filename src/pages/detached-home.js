import React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  Header,
  HeroSection,
  ThreeStatsSection,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
} from "../components";

import { spliceIntoChunks } from "../utils/spliceIntoChunks";
// import Seo from "../seo/Seo";

const DetachedHomePage = ({ data }) => {
  const platinumAccessProjects = data.platinumAccessProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const sellingProjects = data.sellingProjects.nodes;
  const projectsByCityLinks = spliceIntoChunks(data.projectsByCityLinks.nodes);
  const projectsByDeveloperLinks = spliceIntoChunks(data.projectsByDeveloperLinks.nodes);

  return (
    <div>
      {/* <Seo
        seo={{
          seoTitle: "Detached Home",
          seoDescription: "This is where we’d write some friendly text about how we appealing a condo is to own.",
        }}
      /> */}
      <Header logoLink="/" />
      <HeroSection
        image={
          <StaticImage
            src="../assets/hero/detached-home-hero-image.png"
            alt="Detached home hero section background"
            className="-z-10 w-full h-screen md:h-500px"
          />
        }
        title="Detached Home"
        heroTopText="PROPERTY TYPE"
        heroContent="This is where we’d write some friendly text about how we appealing a condo is to own."
        heroContentCss="footer-font md:font-normal text-black-gray"
        isStaticImage
      />
      <div className="bg-white-pink md:bg-transparent">
        <div className="mx-25px lg:mx-120px pt-50px md:pt-100px">
          <h2 className="markdown-default">Owning a Detached Home</h2>
          <p className="mb-24px">
            Toronto is Canada’s largest city, with one of the most diverse populations in the world. The structure of
            Toronto’s population has changed over time, influencing population health status and other social outcomes,
            and shaping the city in a dynamic fashion. Demographic information reflecting the city’s changing size and
            composition, helps public health and other service providers prepare to respond to issues and demands
            arising from population growth, aging, migration, and other changes.{" "}
          </p>
        </div>
        <div className="lg:px-120px pb-40px lg:pb-0px">
          <ThreeStatsSection
            statOneLabel="Average Condo Price"
            statOneValue="$545,000"
            statTwoLabel="Average Condo SIZE"
            statTwoValue="716 sq.ft"
            statThreeLabel="A condo market trend"
            statThreeValue="+17% yoy"
            className="px-25px lg:0-px pb-20px md:pb-40px"
          />
        </div>
        <div className="border-t-2 md:border-t md:mx-25px lg:mx-120px md:mt-35px mb-10px md:-mb-10px border-gray-border md:border-white-pink"></div>
        <div className="double-slider-small-tiles-background">
          <SliderSmallTiles
            mainTitle="Platinum Access"
            helpMarkTooltip="Platinum Access Slider Tooltip"
            showHelpMark={true}
            smallTileData={platinumAccessProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-40px"
            paddingSliderClasses="pt-70px"
          />
          <SliderSmallTiles
            mainTitle="Launching Soon"
            helpMarkTooltip="Launching Soon Slider Tooltip"
            showHelpMark={true}
            smallTileData={launchingSoonProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-70px"
            paddingSliderClasses="pt-70px pb-50px"
          />
        </div>
        <ViewByLinks viewAllLink="/cities" title="View Projects by City:" links={projectsByCityLinks} />
        <div className="double-slider-small-tiles-background">
          <SliderSmallTiles
            mainTitle="Selling"
            helpMarkTooltip="Selling Slider Tooltip"
            showHelpMark={true}
            smallTileData={sellingProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-95px"
            paddingSliderClasses="pt-70px pb-50px"
          />
        </div>
      </div>
      <ViewByLinks viewAllLink="/developers" title="View Projects by Developer:" links={projectsByDeveloperLinks} />
      <ContactRealtorFormSection />
      <Footer />
    </div>
  );
};

export default DetachedHomePage;

export const query = graphql`
  query {
    platinumAccessProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        fields: { projectStatus: { eq: "platinum-access" } }
        projectType: { type: { eq: "detached" } }
      }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    launchingSoonProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        fields: { projectStatus: { eq: "launching-soon" } }
        projectType: { type: { eq: "detached" } }
      }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    sellingProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        fields: { projectStatus: { eq: "selling" } }
        projectType: { type: { eq: "detached" } }
      }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
        projectPreviewImage {
          ...SearchImage
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
    projectsByDeveloperLinks: allContentfulDeveloper(limit: 15, sort: { fields: developerName, order: ASC }) {
      nodes {
        label: developerName
        url: fields {
          pageUrl
        }
      }
    }
  }
`;
