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

const TownhousePage = ({ data }) => {
  const newestReleasesProjects = data.newestReleasesProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const projectsByCityLinks = spliceIntoChunks(data.projectsByCityLinks.nodes);
  const projectsByDeveloperLinks = spliceIntoChunks(data.projectsByDeveloperLinks.nodes);

  return (
    <div>
      {/* <Seo
        seo={{
          seoTitle: "Townhouse",
          seoDescription: "This is where we’d write some friendly text about how we appealing a condo is to own.",
        }}
      /> */}
      <Header logoLink="/" />
      <HeroSection
        image={
          <StaticImage
            src="../assets/hero/condo-hero-image.png"
            alt="Condo hero section background"
            className="-z-10 w-full h-screen md:h-500px"
          />
        }
        title="Townhouse"
        heroTopText="PROPERTY TYPE"
        heroContent="This is where we’d write some friendly text about how we appealing a condo is to own."
        heroContentCss="footer-font md:font-normal text-black-gray"
        isStaticImage
      />
      <div className="bg-white-pink md:bg-transparent">
        <div className="mx-25px lg:mx-120px pt-50px md:pt-100px mb-24px">
          <h2 className="mb-40px">Owning a Townhouse</h2>
          <p>
            Toronto is Canada’s largest city, with one of the most diverse populations in the world. The structure of
            Toronto’s population has changed over time, influencing population health status and other social outcomes,
            and shaping the city in a dynamic fashion. Demographic information reflecting the city’s changing size and
            composition, helps public health and other service providers prepare to respond to issues and demands
            arising from population growth, aging, migration, and other changes.
          </p>
        </div>
        <div className="lg:px-120px pb-40px lg:pb-0px">
          <ThreeStatsSection
            statOneLabel="Average Condo Price"
            statOneValue="$545,000"
            statTwoLabel="Average Condo SIZE"
            statTwoValue="716 sq.ft"
            statThreeLabel="Acondo market trend"
            statThreeValue="+17% yoy"
            className="px-25px lg:0-px pb-20px md:pb-40px"
          />
        </div>
        <div className="border-t-2 md:border-t md:mx-25px lg:mx-120px md:mt-35px mb-10px md:-mb-10px border-gray-border md:border-white-pink"></div>
        <div className="double-slider-small-tiles-background">
          <SliderSmallTiles
            mainTitle="Newest Releases"
            helpMarkTooltip="Newest Releases Slider Tooltip"
            showHelpMark={true}
            smallTileData={newestReleasesProjects}
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
        <ViewByLinks title="View Projects by City:" links={projectsByCityLinks} />
        <div className="double-slider-small-tiles-background">
          <SliderSmallTiles
            mainTitle="Newest Releases"
            helpMarkTooltip="Newest Releases Slider Tooltip"
            showHelpMark={true}
            smallTileData={newestReleasesProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-95px"
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
      </div>
      <ViewByLinks title="View Projects by Developer:" links={projectsByDeveloperLinks} />
      <ContactRealtorFormSection />
      <Footer />
    </div>
  );
};

export default TownhousePage;

export const query = graphql`
  query {
    newestReleasesProjects: allContentfulProject(
      filter: { fields: { projectStatus: { eq: "newest-releases" } }, projectType: { type: { eq: "townhouse" } } }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    launchingSoonProjects: allContentfulProject(
      filter: { fields: { projectStatus: { eq: "launching-soon" } }, projectType: { type: { eq: "townhouse" } } }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    projectsByCityLinks: allContentfulCity(limit: 16, filter: { isTemplateSample: { ne: true } }) {
      nodes {
        label: cityName
        url: fields {
          pageUrl
        }
      }
    }
    projectsByDeveloperLinks: allContentfulDeveloper(limit: 16, filter: { isTemplateSample: { ne: true } }) {
      nodes {
        label: developerName
        url: fields {
          pageUrl
        }
      }
    }
  }
`;
