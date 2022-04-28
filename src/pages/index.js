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
  const projectTypes = data.allStrapiProjectTypes.nodes;

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
    projectsByCityLinks: allStrapiCities(
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
    projectsByDeveloperLinks: allStrapiDevelopers(
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
        special_incentive {
          specialIncentiveDescription
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
        special_incentive {
          specialIncentiveDescription
        }
      }
    }
    sellingProjects: allStrapiProjects(
      filter: { isSoldOut: { eq: false }, special_incentive: { specialIncentiveDescription: { regex: "/.*/" } } }
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
        special_incentive {
          specialIncentiveDescription
        }
      }
    }
    prestigeProjects: allStrapiProjects(
      filter: { isSoldOut: { eq: false }, fields: { projectMinPrice: { gte: 2000000 } } }
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
        developer {
          developerName
        }
        overviewVideoLink
        projectPreviewShortText
        city {
          cityName
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
    allStrapiProjectTypes {
      nodes {
        name
        descriptionText
        fields {
          pageUrl
        }
        projectTypePreviewImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 1000, quality: 100)
            }
          }
        }
      }
    }
  }
`;

