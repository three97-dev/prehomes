import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

import { Header, HeroSection, ContactRealtorFormSection, Footer, CitiesSection } from "../components";

const CityPageTemplate = ({ data }) => {
  const cities = data.cities.nodes.map(city => {
    return  {
      ...city,
      specialIncentives: city.fields.specialIncentivesProjects || 0,
      newListing: city.fields.newListingProjects || 0,
      selling: city.fields.sellingProjects || 0,
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
    cities: allStrapiCities(sort: { fields: cityName, order: ASC }) {
      nodes {
        strapiId
        cityName
        cityImages {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        fields {
          pageUrl
          specialIncentivesProjects
          newListingProjects
          sellingProjects
        }
      }
    }
  }
`;
