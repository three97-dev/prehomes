import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  HeroSection,
  TextSection,
  ThreeStatsSection,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
} from "../components";

const CondoPage = ({ data }) => {
  const propertyPageData = data.contentfulPropertyPage;
  const propertyType = data.contentfulPagePropertyType;
  const newestReleasesProjects = data.newestReleasesProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const developmentsByCityLinks = data.developmentsByCityLinks.links.columns;
  const projectsByDeveloperLinks = data.projectsByDeveloperLinks.links.columns;

  return (
    <div>
      <Header logoLink="/" />
      <HeroSection
        image={propertyType.heroImage}
        title={propertyType.heroTitle}
        heroTopText={propertyPageData.heroTopText}
        heroContent={propertyType.heroContent}
        heroContentCss="footer-font md:font-normal text-black-gray"
        isFixedHeader
      />
      <div className="bg-white-pink md:bg-transparent">
        <TextSection content={propertyType.overviewText} className="mx-25px lg:mx-120px pt-50px md:pt-100px" />
        <div className="lg:px-120px pb-30px sm+:pb-40px lg:pb-0px">
          <ThreeStatsSection
            statOneLabel={propertyPageData.averagePrice}
            statOneValue={propertyType.averagePrice}
            statTwoLabel={propertyPageData.averageSize}
            statTwoValue={propertyType.averageSize}
            statThreeLabel={propertyPageData.marketTrend}
            statThreeValue={propertyType.marketTrend}
            className="px-25px lg:0-px pb-20px md:pb-40px"
          />
        </div>
        <div className="border-t-2 md:border-t md:mx-25px lg:mx-120px md:mt-35px mb-10px md:-mb-10px border-gray-border md:border-white-pink"></div>
        <div className="double-slider-small-tiles-background">
          <SliderSmallTiles
            arrowsColor="black-gray-2"
            mainTitle={propertyPageData.newestReleasesSliderTitle}
            helpMarkTooltip={propertyPageData.newestReleasesSliderTooltip}
            showHelpMark={true}
            smallTileData={newestReleasesProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-40px"
            paddingSliderClasses="pt-70px"
          />
          <SliderSmallTiles
            arrowsColor="black-gray-2"
            mainTitle={propertyPageData.launchingSoonSliderTitle}
            helpMarkTooltip={propertyPageData.launchingSoonSliderTooltip}
            showHelpMark={true}
            smallTileData={launchingSoonProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-70px"
            paddingSliderClasses="pt-70px pb-50px"
          />
        </div>
        <ViewByLinks title={propertyPageData.viewDevelopmentsByCity} links={developmentsByCityLinks} />
        <div className="double-slider-small-tiles-background">
          <SliderSmallTiles
            arrowsColor="black-gray-2"
            mainTitle={propertyPageData.newestReleasesSliderTitle}
            helpMarkTooltip={propertyPageData.newestReleasesSliderTooltip}
            showHelpMark={true}
            smallTileData={newestReleasesProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-95px"
            paddingSliderClasses="pt-70px"
          />
          <SliderSmallTiles
            arrowsColor="black-gray-2"
            mainTitle={propertyPageData.launchingSoonSliderTitle}
            helpMarkTooltip={propertyPageData.launchingSoonSliderTooltip}
            showHelpMark={true}
            smallTileData={launchingSoonProjects}
            bgWrapperClasses="bg-transparent"
            paddingTitleClasses="pt-70px"
            paddingSliderClasses="pt-70px pb-50px"
          />
        </div>
        <ViewByLinks title={propertyPageData.viewProjectsByDeveloper} links={projectsByDeveloperLinks} />
        <ContactRealtorFormSection />
        <Footer />
      </div>
    </div>
  );
};

export default CondoPage;

export const query = graphql`
  query {
    contentfulPropertyPage(isTemplateSample: { ne: true }) {
      heroTopText
      averagePrice
      averageSize
      marketTrend
      newestReleasesSliderTitle
      newestReleasesSliderTooltip
      launchingSoonSliderTitle
      launchingSoonSliderTooltip
      viewDevelopmentsByCity
      viewProjectsByDeveloper
    }
    contentfulPagePropertyType(cmsName: { eq: "Condo" }) {
      heroTitle
      heroContent
      heroImage {
        ...Image
      }
      overviewText {
        raw
      }
      averagePrice
      averageSize
      marketTrend
    }
    newestReleasesProjects: allContentfulProject(
      filter: {
        isTemplateSample: { ne: true }
        fields: { projectStatus: { eq: "newest-releases" } }
        projectType: { type: { eq: "condo" } }
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
        projectType: { type: { eq: "condo" } }
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
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    developmentsByCityLinks: contentfulViewByLinks(
      isTemplateSample: { ne: true }
      contentful_id: { eq: "2S8Kg18rPYTpffWMMJmuzN" }
    ) {
      links {
        columns {
          label
          url
        }
      }
    }
    projectsByDeveloperLinks: contentfulViewByLinks(
      isTemplateSample: { ne: true }
      contentful_id: { eq: "2uerc7Heo2j9jBJAklhIjW" }
    ) {
      links {
        columns {
          label
          url
        }
      }
    }
  }
`;
