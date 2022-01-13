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

const PremiumPage = ({ data }) => {
  const premiumPageData = data.contentfulPremiumPage;
  const newestReleasesProjects = data.newestReleasesProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;

  return (
    <>
      <Header logoLink="/" variant="premium" />

      <PremiumAndPrestigeHero
        image={premiumPageData.heroImage}
        title={premiumPageData.title}
        heroTopText={premiumPageData.heroTopText}
        heroContent={premiumPageData.heroContent}
      />
      <div className="bg-black-gray w-full pt-50px md:pt-87px">
        <PremiumAndPrestigeText title={premiumPageData.headTitle} textContent={premiumPageData.headContent} />
        <PrestigeAndPremiumSlider
          title={premiumPageData.newReleasesSliderTitle}
          projects={newestReleasesProjects}
          blackVariant
        />
        <PrestigeAndPremiumSlider
          title={premiumPageData.launchingSoonSliderTitle}
          projects={launchingSoonProjects}
          blackVariant
        />
        {/* <PrestigeAndPremiumSlider
          title={premiumPageData.allPrestigePropertiesSliderTitle}
          sliderData={[]}
          blackVariant
        /> */}
      </div>
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};

export default PremiumPage;

export const query = graphql`
  query {
    contentfulPremiumPage(isTemplateSample: { ne: true }) {
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
      allPrestigePropertiesSliderTitle
    }
    newestReleasesProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
        fields: { projectStatus: { eq: "newest-releases" } }
        projectCollection: { eq: "Premium" }
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
        projectCollection: { eq: "Premium" }
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
