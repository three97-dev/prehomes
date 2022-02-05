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
  const premiumProjects = data.premiumProjects.nodes;
  const prestigeProjects = data.prestigeProjects.nodes;

  const firstTile = {
    link: "/townhouse",
    image: <StaticImage src="../assets/home/large-tile-section.png" alt="Tile" className="h-215px lg:h-349px" />,
    title: "Townhouse",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    viewAll: "View All",
  };
  const secondTile = {
    link: "/condo",
    image: <StaticImage src="../assets/home/large-tile-section.png" alt="Tile" className="h-215px lg:h-349px" />,
    title: "Condos",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    viewAll: "View All",
  };
  const thirdTile = {
    link: "/detached-home",
    image: <StaticImage src="../assets/home/large-tile-section.png" alt="Tile" className="h-215px lg:h-349px" />,
    title: "Detached Homes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    viewAll: "View All",
  };

  const inputAutocompleteItems = [
    {
      label: "New York, New York, United States",
      subtitle: "Location",
      link: "/",
    },
    { label: "Lorem Ipsum", subtitle: "Location", link: "/" },
    { label: "Lorem Ipsum", subtitle: "Location", link: "/" },
    { label: "Lorem Ipsum", subtitle: "Architect in New York", link: "/" },
    { label: "Lorem Ipsum", subtitle: "Developer and Builder in New York", link: "/" },
  ];
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
        title="Explore new construction homes."
        image={
          <StaticImage
            src="../assets/hero/home-hero-image.jpg"
            alt="Home hero page background"
            className="home-hero-image absolute min-w-700px w-full -z-10 right-0px h-screen"
          />
        }
        inputAutocompleteItems={inputAutocompleteItems}
        placeholder="Type in a city, neighborhood, or new development"
        bottomText="New to prehomes?"
        bottomTextUnderline="Watch our video."
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
      <ViewByLinks title="View Projects by City:" links={projectsByCityLinks} />
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
      <ViewByLinks title="View Projects by Developer:" links={projectsByDeveloperLinks} />
      <ViewLargeTilesSection
        title="Search by Property Type"
        firstTile={firstTile}
        secondTile={secondTile}
        thirdTile={thirdTile}
      />
      <PrestigeCollectionSliderSection
        title="Penthouse Collection"
        subtitle="The highest standard in construction and interior development."
        link="/prestige"
        linkLabel="View the collection"
        projects={premiumProjects}
      />
      <PrestigeCollectionSliderSection
        title="Prestige Collection"
        subtitle="These developments standout for their attention to detail and renowned reputation."
        link="/premium"
        linkLabel="View the collection"
        projects={prestigeProjects}
        blackVariant
      />
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};
export default IndexPage;

export const query = graphql`
  query {
    projectsByCityLinks: allContentfulCity(limit: 16, sort: { fields: cityName, order: ASC }) {
      nodes {
        label: cityName
        url: fields {
          pageUrl
        }
      }
    }
    projectsByDeveloperLinks: allContentfulDeveloper(limit: 16, sort: { fields: developerName, order: ASC }) {
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
      }
    }
    sellingProjects: allContentfulProject(
      filter: { isSoldOut: { eq: false }, fields: { projectStatus: { eq: "selling" } } }
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
    premiumProjects: allContentfulProject(filter: { isSoldOut: { eq: false }, projectCollection: { eq: "Premium" } }) {
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
    prestigeProjects: allContentfulProject(
      filter: { isSoldOut: { eq: false }, projectCollection: { eq: "Prestige" } }
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
