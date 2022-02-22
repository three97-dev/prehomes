import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

import { Header, HeroSection, ContactRealtorFormSection, Footer, CitiesSection } from "../components";

const CityPageTemplate = ({ data }) => {
  const cities = data.cities.nodes;
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
        title="Cities"
        className="bg-transparent"
      />
      <div className="lg:px-120px md:pb-35px md+:pt-75px">
        <CitiesSection title="List of Cities" showHelpMark helpMarkTooltip="List of Cities Tooltip" cities={cities} />
      </div>
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};

export default CityPageTemplate;

export const query = graphql`
  query {
    cities: allContentfulCity(sort: { fields: cityName, order: ASC }) {
      nodes {
        contentful_id
        cityName
        cityImages {
          ...Image
        }
        fields {
          pageUrl
        }
      }
    }
  }
`;
