import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  Footer,
  HeroSection,
  TextImageSection,
  ViewByLinks,
  ContactRealtorFormSection,
  SliderSmallTiles,
} from "../components";

const DeveloperPageTemplate = ({ data }) => {
  const developerPageData = data.contentfulDeveloperPage;
  const developer = data.contentfulDeveloper;
  const projectsByDeveloperLinks = data.projectsByDeveloperLinks.links.columns;
  const otherProjects = data.otherProjects.nodes;

  return (
    <>
      <Header logoLink="/" />
      <HeroSection
        image={developer.developerPreviewImage}
        title={developer.developerName}
        heroTopText={developerPageData.heroTopText}
        heroContent={developer.developerSubtitleText}
        heroLogoImage={developer.developerPreviewLogo}
        isFixedHeader
        heroContentCss="footer-font md:font-normal text-black-gray"
      />
      <div className="lg:px-120px flex flex-col items-center pt-49px md:pt-100px bg-white-pink md:bg-transparent">
        <TextImageSection content={developer.overviewText} image={developer.overviewImage} />
      </div>
      <hr className="hidden md:block bg-beige h-2px md:max-w-1130px border-none bg-clip-content md:mx-120px mt-23px" />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle={`${developerPageData.sliderTitle} ${developer.developerName}`}
        smallTileData={otherProjects}
        bgWrapperClasses="bg-white-pink md:bg-transparent"
        paddingTitleClasses="pt-50px md:pt-30px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      <ViewByLinks title={developerPageData.viewByLinksTitle} links={projectsByDeveloperLinks} />
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};

export default DeveloperPageTemplate;

export const query = graphql`
  query DeveloperTemplate($developer_contentful_id: String!) {
    contentfulDeveloperPage(isTemplateSample: { ne: true }) {
      heroTopText
      sliderTitle
      viewByLinksTitle
    }
    contentfulDeveloper(contentful_id: { eq: $developer_contentful_id }) {
      cmsName
      contentful_id
      developerName
      developerSubtitleText
      developerPreviewImage {
        ...Image
      }
      developerPreviewLogo {
        ...Image
      }
      overviewText {
        raw
      }
      overviewImage {
        ...Image
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
    otherProjects: allContentfulProject(
      filter: { isTemplateSample: { ne: true }, projectDeveloper: { contentful_id: { eq: $developer_contentful_id } } }
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
  }
`;
