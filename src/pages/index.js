import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  HeroHome,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
  ViewLargeTilesSection,
  PrestigeCollection,
  PropertyTypeSection,
} from "../components";
// import Seo from "../seo/Seo";

import { spliceIntoChunks } from "../utils/spliceIntoChunks";
import platinumIcon from "../assets/platinum.png";
import fastForwardIcon from "../assets/fast-forward.png";
import starIcon from "../assets/star.png";

const IndexPage = ({ data }) => {
  const projectsByCityLinks = spliceIntoChunks(data.projectsByCityLinks.nodes);
  const projectsByDeveloperLinks = spliceIntoChunks(data.projectsByDeveloperLinks.nodes);
  const platinumAccessProjects = data.platinumAccessProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const sellingProjects = data.sellingProjects.nodes;
  const prestigeProjects = data.prestigeProjects.nodes;

  return (
    <>
      {/* <Seo
        seo={{
          seoTitle: "Home",
          seoDescription: "All building in the world",
        }}
      /> */}
      <Header logoLink="/" variant="home" />
      <HeroHome
        title="Explore New Construction Homes."
        placeholder="Ex: 1234 New Construction Rd, Constructionville"
        bottomText="New to prehomes?"
        bottomTextUnderline="Watch our video"
      />
      <PropertyTypeSection />
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle="Platinum Access"
        smallTileData={platinumAccessProjects}
        bgWrapperClasses="mx-auto"
        icon={platinumIcon}
        paddingTitleClasses="mb-32px"
      />
      <ViewByLinks viewAllLink="/cities" title="City" links={projectsByCityLinks} />
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle="Launching Soon"
        smallTileData={launchingSoonProjects}
        bgWrapperClasses="mx-auto"
        icon={fastForwardIcon}
        paddingTitleClasses="mb-32px"
      />
      <PrestigeCollection link="/prestige" linkLabel="View the collection" projects={prestigeProjects} />
      <ViewByLinks viewAllLink="/developers" title="Developer" links={projectsByDeveloperLinks} />
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle="Special Incentives"
        icon={starIcon}
        smallTileData={sellingProjects}
        bgWrapperClasses="mx-auto"
        paddingTitleClasses="mb-32px"
      />
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};
export default IndexPage;

export const query = graphql`
  query {
    projectsByCityLinks: allContentfulCity(
      limit: 15
      sort: { fields: cityName, order: ASC }
      filter: { cityName: { regex: "/^.{3,10}$/" } }
    ) {
      nodes {
        label: cityName
        url: fields {
          pageUrl
        }
      }
    }
    projectsByDeveloperLinks: allContentfulDeveloper(
      limit: 15
      sort: { fields: developerName, order: ASC }
      filter: { developerName: { regex: "/^.{3,10}$/" } }
    ) {
      nodes {
        label: developerName
        url: fields {
          pageUrl
        }
      }
    }
    platinumAccessProjects: allContentfulProject(
      filter: { isSoldOut: { eq: false }, fields: { projectStatus: { eq: "platinum-access" } } }
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
        specialIncentive {
          specialIncentiveDescription
        }
      }
    }
    launchingSoonProjects: allContentfulProject(
      filter: { isSoldOut: { eq: false }, fields: { projectStatus: { eq: "launching-soon" } } }
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
        specialIncentive {
          specialIncentiveDescription
        }
      }
    }
    sellingProjects: allContentfulProject(
      filter: { isSoldOut: { eq: false }, specialIncentive: { specialIncentiveDescription: { regex: "/.*/" } } }
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
        specialIncentive {
          specialIncentiveDescription
        }
      }
    }
    allContentfulProjectType {
      nodes {
        name
        descriptionText
        fields {
          pageUrl
        }
        projectTypePreviewImage {
          ...ProjectTypePreviewImage
        }
      }
    }
    prestigeProjects: allContentfulProject(
      filter: { isSoldOut: { eq: false }, fields: { projectMinPrice: { gte: 2000000 } } }
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
        projectDeveloper {
          developerName
        }
        overviewVideoLink
        projectPreviewShortText
        projectCity {
          cityName
        }
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
  }
`;
