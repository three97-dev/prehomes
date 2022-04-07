import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

import { Header, HeroSection, ContactRealtorFormSection, Footer, CitiesSection } from "../components";

const CityPageTemplate = ({ data }) => {
  const cities = data.cities.nodes.map(city => {
    if (city.project) {
      return {
        ...city,
        specialIncentives: city.project.filter(project => project.specialIncentive).length,
        newListing: city.project.filter(project => project.fields.projectStatus === "platinum-access").length,
      };
    }

    return {
      ...city,
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
            src="../assets/hero/cities-hero-image.png"
            alt="Cities hero"
            className="h-300px md:h-305px md:w-494px"
          />
        }
        heroTopText="You're Exploring:"
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
        project {
          id
          fields {
            projectStatus
          }
          specialIncentive {
            specialIncentiveDescription
          }
        }
        fields {
          pageUrl
        }
      }
    }
  }
`;
