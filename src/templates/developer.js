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
import DeveloperHeroSection from "../components/hero-section/developer-hero-section/DeveloperHeroSection";
// import Seo from "../seo/Seo";

const DeveloperPageTemplate = ({ data }) => {
  const developer = data.strapiDevelopers;
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
        rightHeroContent={<DeveloperHeroSection developerPreviewImage={developer.developerPreviewImage} />}
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
  query DeveloperTemplate($developer_strapi_id: Int) {
    strapiDevelopers(strapiId: { eq: $developer_strapi_id }) {
      strapiId
      developerName
      developerSubtitleText
      developerPreviewImage {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
      overviewText
      developerLocation {
        lat
        lon
      }
    }
    projectsByDeveloperLinks: allStrapiDevelopers(limit: 15, sort: { fields: developerName, order: ASC }) {
      nodes {
        label: developerName
        url: fields {
          pageUrl
        }
      }
    }
    otherProjects: allStrapiProjects(
      filter: { isSoldOut: { eq: false }, developer: { id: { eq: $developer_strapi_id } } }
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
      }
    }
  }
`;
