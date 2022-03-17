import React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import {
  Header,
  HeroHome,
  PrestigeCollectionSliderSection,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
  ViewLargeTilesSection,
} from "../components";
// import Seo from "../seo/Seo";

import { spliceIntoChunks } from "../utils/spliceIntoChunks";

const IndexPage = ({ data }) => {
  const projectsByCityLinks = spliceIntoChunks(data.projectsByCityLinks.nodes);
  const projectsByDeveloperLinks = spliceIntoChunks(data.projectsByDeveloperLinks.nodes);
  const platinumAccessProjects = data.platinumAccessProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const sellingProjects = data.sellingProjects.nodes;
  const viewLargeTiles = data.allContentfulProjectType.nodes;
  const penthouseProjects = data.penthouseProjects.nodes;

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
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle="Platinum Access"
        helpMarkTooltip="Platinum Access Tooltip"
        showHelpMark={true}
        smallTileData={platinumAccessProjects}
        bgWrapperClasses="bg-light-gray mx-auto"
        paddingTitleClasses="pt-95px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      <ViewByLinks viewAllLink="/cities" title="City" links={projectsByCityLinks} />
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle="Launching Soon"
        helpMarkTooltip="Launching Soon Tooltip"
        showHelpMark={true}
        smallTileData={launchingSoonProjects}
        bgWrapperClasses="bg-light-gray mx-auto"
        paddingTitleClasses="pt-95px"
        paddingSliderClasses="pt-70px"
      />
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle="Special Incentives"
        helpMarkTooltip="Special Incentives Tooltip"
        showHelpMark={true}
        smallTileData={sellingProjects}
        bgWrapperClasses="bg-light-gray mx-auto"
        paddingTitleClasses="pt-70px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      <ViewByLinks viewAllLink="/developers" title="Developer" links={projectsByDeveloperLinks} />
      <ViewLargeTilesSection title="Search by Property Type" tiles={viewLargeTiles} />
      <PrestigeCollectionSliderSection
        title="Penthouse Collection"
        subtitle="The highest standard in construction and interior development."
        link="/prestige"
        linkLabel="View the collection"
        projects={penthouseProjects}
      />
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};
export default IndexPage;

export const query = graphql`
  query {
    projectsByCityLinks: allContentfulCity(limit: 15, sort: { fields: cityName, order: ASC }) {
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
      filter: { developerName: { regex: "/^.{3,12}$/" } }
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
    penthouseProjects: allContentfulProject(
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
        projectPreviewShortText
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
  }
`;
