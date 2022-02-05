import React from "react";
import { graphql } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";

import {
  Header,
  PremiumAndPrestigeHero,
  PremiumAndPrestigeText,
  PrestigeAndPremiumSlider,
  ContactRealtorFormSection,
  Footer,
} from "../components";
// import Seo from "../seo/Seo";

const PrestigePage = ({ data }) => {
  const platinumAccessProjects = data.platinumAccessProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;

  return (
    <>
      {/* <Seo
        seo={{
          seoTitle: "Prestige",
          seoDescription: "Prestige building",
        }}
      /> */}
      <Header logoLink="/" variant="prestige" />
      <PremiumAndPrestigeHero
        image={
          <StaticImage
            src="../assets/prestige-page/heroImage.png"
            alt="Prestige hero section background"
            className="-z-10 w-full h-screen sm+:h-500px object-fill"
          />
        }
        title="Penthouse"
        heroTopText="COLLECTIONS"
        heroContent="The capital of Ontario and the financial hub of Canada. Home to over 3M residents."
      />

      <div className="bg-dark-orange bg-opacity-75 w-full pt-49px md:pt-87px">
        <PremiumAndPrestigeText
          title="The Penthouse Collection"
          textContent={
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          }
          prestigePage
        />
        <PrestigeAndPremiumSlider title="Platinum Access" projects={platinumAccessProjects} />
        <PrestigeAndPremiumSlider title="Launching Soon" projects={launchingSoonProjects} />
        {/* <PrestigeAndPremiumSlider
          title="All Penthouse Properties"
          projects={tileData.sliderTileContent}
        /> */}
      </div>
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};

export default PrestigePage;

export const query = graphql`
  query {
    platinumAccessProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        fields: { projectStatus: { eq: "platinum-access" } }
        projectCollection: { eq: "Prestige" }
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
        projectPreviewShortText
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    launchingSoonProjects: allContentfulProject(
      filter: {
        isSoldOut: { eq: false }
        fields: { projectStatus: { eq: "launching-soon" } }
        projectCollection: { eq: "Prestige" }
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
        projectPreviewShortText
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
  }
`;
