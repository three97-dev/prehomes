import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

import { Header, HeroSection, ContactRealtorFormSection, Footer, DevelopersSection } from "../components";

const DeveloperPageTemplate = ({ data }) => {
  const developers = data.developers.nodes;
  return (
    <>
      <Header />
      <HeroSection
        image={
          <StaticImage
            src="../assets/hero/cities.jpg"
            alt="Cities hero page background"
            className="-z-12 w-full h-screen md:h-500px"
          />
        }
        isStaticImage
        heroTopText="View All"
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
          ...Image
        }
        fields {
          pageUrl
        }
      }
    }
  }
`;
