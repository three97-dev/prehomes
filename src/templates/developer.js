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
  Image,
} from "../components";

import { spliceIntoChunks } from "../utils/spliceIntoChunks";
import { StaticImage } from "gatsby-plugin-image";
// import Seo from "../seo/Seo";

const DeveloperPageTemplate = ({ data }) => {
  const developer = data.contentfulDeveloper;
  const projectsByDeveloperLinks = spliceIntoChunks(data.projectsByDeveloperLinks.nodes);
  const otherProjects = data.otherProjects.nodes;

  const renderRightHeroContent = () => (
    <div className="relative md:w-470px flex md:justify-end h-300px md:h-auto">
      <StaticImage src="../assets/hero/developer-hero-image.png" alt="Developer hero" className="w-full md:w-384px" />
      <div className="w-300px rounded-15px h-200px bg-white flex p-16px justify-center items-center absolute top-0px md:top-40px left-40px md:-left-160px z-100">
        <Image image={developer.developerPreviewImage} alt="Developers hero" className="w-full" />
      </div>
    </div>
  );

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
        rightHeroContent={renderRightHeroContent()}
        title={developer.developerName}
        heroTopText="You're Exploring:"
        viewAllLink="/developers"
        viewAllText="View all Developers"
        heroLogoImage={developer.developerPreviewLogo}
        viewAllClassName="bottom-32px"
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
      <ViewByLinks viewAllLink="/developers" title="Developer" links={projectsByDeveloperLinks} />
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
