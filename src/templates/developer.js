import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  Footer,
  HeroSection,
  TextMapSection,
  ViewByLinks,
  ContactRealtorFormSection,
  SliderSmallTiles,
} from "../components";

import { spliceIntoChunks } from "../utils/spliceIntoChunks";
// import Seo from "../seo/Seo";

const DeveloperPageTemplate = ({ data }) => {
  const developer = data.contentfulDeveloper;
  const projectsByDeveloperLinks = spliceIntoChunks(data.projectsByDeveloperLinks.nodes);
  const otherProjects = data.otherProjects.nodes;

  return (
    <>
      {/* <Seo
        seo={{
          seoTitle: developer.developerName,
          seoDescription: developer.developerSubtitleText,
        }}
      /> */}
      <Header logoLink="/" />
      <HeroSection
        image={developer.developerPreviewImage}
        title={developer.developerName}
        heroTopText="developer view"
        heroContent={developer.developerSubtitleText}
        heroLogoImage={developer.developerPreviewLogo}
        isFixedHeader
        heroContentCss="footer-font md:font-normal text-black-gray"
      />
      <div className="lg:px-120px flex flex-col items-center pt-49px md:pt-100px bg-white-pink md:bg-transparent">
        <TextMapSection
          title={`About ${developer.developerName}`}
          content={developer.overviewText}
          mapZoom={15}
          centerPosition={developer.developerLocation}
          isMarkerVisible
        />
      </div>
      <hr className="hidden md:block bg-beige h-2px md:max-w-1130px border-none bg-clip-content md:mx-120px mt-23px" />
      <SliderSmallTiles
        arrowsColor="black-gray-2"
        mainTitle={`Projects by ${developer.developerName}`}
        smallTileData={otherProjects}
        bgWrapperClasses="bg-white-pink md:bg-transparent"
        paddingTitleClasses="pt-50px md:pt-30px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      <ViewByLinks viewAllLink="/developers" title="View Projects by Developer:" links={projectsByDeveloperLinks} />
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};

export default DeveloperPageTemplate;

export const query = graphql`
  query DeveloperTemplate($developer_contentful_id: String!) {
    contentfulDeveloper(contentful_id: { eq: $developer_contentful_id }) {
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
      developerLocation {
        lat
        lon
      }
    }
    projectsByDeveloperLinks: allContentfulDeveloper(limit: 15, sort: { fields: developerName, order: ASC }) {
      nodes {
        label: developerName
        url: fields {
          pageUrl
        }
      }
    }
    otherProjects: allContentfulProject(
      filter: { isSoldOut: { eq: false }, projectDeveloper: { contentful_id: { eq: $developer_contentful_id } } }
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
  }
`;
