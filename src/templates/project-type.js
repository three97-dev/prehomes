import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  HeroSection,
  ThreeStatsSection,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
  Markdown,
} from "../components";

import { spliceIntoChunks } from "../utils/spliceIntoChunks";
// import Seo from "../seo/Seo";

const ProjectTypePageTemplate = ({ data }) => {
  const projectType = data.strapiProjectTypes;
  const platinumAccessProjects = data.platinumAccessProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const sellingProjects = data.sellingProjects.nodes;
  const projectsByCityLinks = spliceIntoChunks(data.projectsByCityLinks.nodes);
  const projectsByDeveloperLinks = spliceIntoChunks(data.projectsByDeveloperLinks.nodes);
  return (
    <div>
      {/*   <Seo
      seo={{
        seoTitle: projectType.name,
        seoDescription: projectType.descriptionText,
      }}
    />  */}
      <Header logoLink="/" />
      <HeroSection
        image={projectType.projectTypePreviewImage}
        title={projectType.name}
        heroTopText="PROPERTY TYPE"
        heroContent={projectType.descriptionText}
        heroContentCss="footer-font md:font-normal text-black-gray"
        isFixedHeader
      />
      <div className="bg-white-pink md:bg-transparent">
        <div className="mx-25px lg:mx-120px pt-50px md:pt-100px mb-24px">
          <h2 className="mb-40px">Owning a {projectType.name}</h2>
          <div className="mb-24px">
            <Markdown data={projectType.aboutProjectType} />
          </div>
        </div>
        <div className="lg:px-120px pb-30px sm+:pb-40px lg:pb-0px">
          <ThreeStatsSection
            statOneLabel={`Average ${projectType.name} Price`}
            statOneValue={`${projectType.averagePrice ? "$" + projectType.averagePrice.toLocaleString("en-US") : ""}`}
            statTwoLabel={`Average ${projectType.name} SIZE`}
            statTwoValue={`${projectType.averageSize} sq.ft`}
            statThreeLabel={`A ${projectType.name} market trend`}
            statThreeValue={`+${projectType.marketTrend} % yoy`}
            className="px-25px lg:0-px pb-20px md:pb-40px"
          />
        </div>
        <div className="border-t-2 md:border-t md:mx-25px lg:mx-120px md:mt-35px mb-10px md:-mb-10px border-gray-border md:border-white-pink"></div>
        <div className="double-slider-small-tiles-background">
          <SliderSmallTiles
            arrowsColor="black-gray-2"
            mainTitle="Platinum Access"
            helpMarkTooltip="Platinum Access Slider Tooltip"
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
            paddingTitleClasses="pt-70px"
            paddingSliderClasses="pt-70px pb-50px"
          />
        </div>
        <ViewByLinks viewAllLink="/cities" title="City" links={projectsByCityLinks} />
        <div className="double-slider-small-tiles-background">
          <SliderSmallTiles
            arrowsColor="black-gray-2"
            mainTitle="Selling"
            helpMarkTooltip="Selling Slider Tooltip"
            showHelpMark={true}
            smallTileData={sellingProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-95px"
            paddingSliderClasses="pt-70px pb-50px"
          />
        </div>
        <ViewByLinks viewAllLink="/developers" title="Developer" links={projectsByDeveloperLinks} />
        <ContactRealtorFormSection />
        <Footer />
      </div>
    </div>
  );
};

export default ProjectTypePageTemplate;

export const query = graphql`
  query ProjectTypeTemplate($projectType_strapi_id: Int) {
    strapiProjectTypes(strapiId: { eq: $projectType_strapi_id }) {
      name
      descriptionText
      averagePrice
      averageSize
      marketTrend
      aboutProjectType
      projectTypePreviewImage {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 1000, quality: 100)
        }
      }
    }
    }
    platinumAccessProjects: allStrapiProjects(
      filter: { isSoldOut: { eq: false }, fields: { projectStatus: { eq: "platinum-access" } } }
    ) {
      nodes {
        strapiId
        projectName
        city {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
        }
      }
    }
    launchingSoonProjects: allStrapiProjects(
      filter: { isSoldOut: { eq: false }, fields: { projectStatus: { eq: "launching-soon" } } }
    ) {
      nodes {
        strapiId
        projectName
        city {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
        }
      }
    }
    sellingProjects: allStrapiProjects(
      filter: { isSoldOut: { eq: false }, fields: { projectStatus: { eq: "selling" } } }
    ) {
      nodes {
        strapiId
        projectName
        city {
          cityName
        }
        fields {
          pageUrl
          projectMinPrice
        }
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
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
    projectsByDeveloperLinks: allStrapiDevelopers(limit: 15, sort: { fields: developerName, order: ASC }) {
      nodes {
        label: developerName
        url: fields {
          pageUrl
        }
      }
    }
  }
`;
