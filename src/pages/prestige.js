import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  PremiumAndPrestigeHero,
  PremiumAndPrestigeText,
  PrestigeAndPremiumSlider,
  ContactRealtorFormSection,
  Footer,
} from "../components";

const PrestigePage = ({ data }) => {
  const prestigePageData = data.contentfulPrestigePage;
  const newestReleasesProjects = data.newestReleasesProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;

  return (
    <>
      <Header logoLink="/" variant="prestige" />
      <PremiumAndPrestigeHero
        image={prestigePageData.heroImage}
        title={prestigePageData.title}
        heroTopText={prestigePageData.heroTopText}
        heroContent={prestigePageData.heroContent}
      />

      <div className="bg-dark-orange bg-opacity-75 w-full pt-49px md:pt-87px">
        <PremiumAndPrestigeText
          title={prestigePageData.headTitle}
          textContent={prestigePageData.headContent}
          prestigePage
        />
        <PrestigeAndPremiumSlider title={prestigePageData.newReleasesSliderTitle} projects={newestReleasesProjects} />
        <PrestigeAndPremiumSlider title={prestigePageData.launchingSoonSliderTitle} projects={launchingSoonProjects} />
        {/* <PrestigeAndPremiumSlider
          title={prestigePageData.allPenthousePropertiesSliderTitle}
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
    contentfulPrestigePage(isTemplateSample: { ne: true }) {
      heroTopText
      title
      heroContent
      heroImage {
        ...Image
      }
      headTitle
      headContent {
        raw
      }
      newReleasesSliderTitle
      launchingSoonSliderTitle
      allPenthousePropertiesSliderTitle
    }
    newestReleasesProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
        fields: { projectStatus: { eq: "newest-releases" } }
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
        }
        projectPreviewShortText
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    launchingSoonProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
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
        }
        projectPreviewShortText
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
  }
`;
