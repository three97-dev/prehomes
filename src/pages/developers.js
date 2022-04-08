import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

import { Header, HeroSection, ContactRealtorFormSection, Footer, DevelopersSection } from "../components";

const DeveloperPageTemplate = ({ data }) => {
  const developers = data.developers.nodes.map(developer => {
    if (developer.project) {
      return {
        ...developer,
        specialIncentives: developer.project.filter(project => project.specialIncentive).length,
        newListing: developer.project.filter(project => project.fields.projectStatus === "platinum-access").length,
        selling: developer.project.filter(project => project.fields.projectStatus === "selling").length,
      };
    }

    return {
      ...developer,
      specialIncentives: 0,
      newListing: 0,
    };
  });
  return (
    <>
      <Header />
      <HeroSection
        rightHeroContent={
          <StaticImage
            src="../assets/hero/developers-hero-image.png"
            alt="Developers hero"
            className="h-300px md:h-auto md:w-470px"
          />
        }
        heroTopText="You're Exploring:"
        title="Developers"
        className="bg-transparent"
      />
      <div className="lg:px-120px md:pb-35px md+:pt-75px">
        <DevelopersSection
          developers={developers}
          title="List of Developers"
          showHelpMark
          helpMarkTooltip="List of Developers Tooltip"
        />
      </div>
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};

export default DeveloperPageTemplate;

export const query = graphql`
  query {
    developers: allContentfulDeveloper(sort: { fields: developerName, order: ASC }) {
      nodes {
        contentful_id
        developerName
        developerPreviewImage {
          ...SearchImage
        }
        fields {
          pageUrl
        }
        project {
          id
          fields {
            projectStatus
          }
          specialIncentive {
            specialIncentiveDescription
          }
        }
      }
    }
  }
`;
