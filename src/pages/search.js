import React from "react";
import { graphql } from "gatsby";

import { Header, SearchSection } from "../components";
// import Seo from "../seo/Seo";

const SearchPage = ({ data }) => {
  const projects = data.allStrapiProjects.nodes;
  const types = data.allStrapiProjectTypes.nodes;

  const allProjects = projects.map(project => {
    const minPrice = project.fields.prices[0] ? project.fields.prices[0].toLocaleString() : "";
    const maxPrice = project.fields.prices[project.fields.prices.length - 1]
      ? project.fields.prices[project.fields.prices.length - 1].toLocaleString()
      : "";

    let neighborhoodStr = project?.neighborhood;
    const cityNameStr = project?.city?.cityName || "";

    if (neighborhoodStr && neighborhoodStr.toLowerCase() === cityNameStr.toLowerCase()) {
      // do not show neighborhood with same value as city
      neighborhoodStr = null;
    }
    
    return {
      id: project.strapiId,
      image: project.projectHeroImage,
      title: project.projectName,
      city: project?.city?.cityName,
      neighborhood: neighborhoodStr,
      prices: project?.fields?.prices,
      price: `$${minPrice} - $${maxPrice}`,
      lat: project?.projectAddressMapLocation?.lat,
      lng: project?.projectAddressMapLocation?.lon,
      types: project?.projectTypes,
      maxBeds: project.fields.maxBeds,
      maxBaths: project.fields.maxBaths,
      squareFootages: project.fields.squareFootages,
      link: project.fields.pageUrl,
    };
  });

  return (
    <>
      {/* <Seo
        seo={{
          seoTitle: "Search",
          seoDescription: "Search for suitable projects",
        }}
      /> */}
      <Header logoLink="/" className="" isStickyHeader />
      <SearchSection
        searchPlaceholder="Search by City, Neighborhood, or Address"
        typeFilterTitle="Type"
        bedsFilterTitle="Beds"
        bathsFilterTitle="Baths"
        minPriceFilterTitle="Min Price"
        maxPriceFilterTitle="Max Price"
        minSizeFilterTitle="Min Size"
        maxSizeFilterTitle="Max Size"
        searchForLabel="Search for "
        resultsLabel="Results"
        noResultsLabel="No results"
        modalTitle="Filters"
        clearButtonLabel="Clear"
        applyButtonLabel="Apply"
        allProjects={allProjects}
        allTypes={types}
        newHomesForSaleLabel="New Homes for Sale"
        filtersLabel="Filters"
        mapViewLabel="Map View"
        listViewLabel="List View"
      />
    </>
  );
};

export default SearchPage;

export const query = graphql`
  query {
    allStrapiProjects(filter: { isSoldOut: { eq: false } }) {
      nodes {
        strapiId
        projectName
        city {
          cityName
        }
        neighborhood
        fields {
          maxBeds
          maxBaths
          prices
          squareFootages
        }
        projectHeroImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
            }
          }
        }
        projectAddressMapLocation {
          lat
          lon
        }
        fields {
          pageUrl
        }
      }
    }
    allStrapiProjectTypes {
      nodes {
        name
      }
    }
  }
`;
