import React from "react";
import { graphql } from "gatsby";

import { Header, SearchSection } from "../components";
// import Seo from "../seo/Seo";

const SearchPage = ({ data }) => {
  const projects = data.allContentfulProject.nodes;

  const allProjects = projects.map(project => {
    const minPrice = project.fields.prices[0] ? project.fields.prices[0].toLocaleString() : "";
    const maxPrice = project.fields.prices[project.fields.prices.length - 1]
      ? project.fields.prices[project.fields.prices.length - 1].toLocaleString()
      : "";

    let neighborhoodStr = project?.fields?.neighborhood;
    const cityNameStr = project?.projectCity?.cityName || "";

    if (neighborhoodStr && neighborhoodStr.toLowerCase() === cityNameStr.toLowerCase()) {
      // do not show neighborhood with same value as city
      neighborhoodStr = null;
    }

    return {
      id: project.contentful_id,
      image: project.projectPreviewImage,
      title: project.projectName,
      city: project?.projectCity?.cityName,
      neighborhood: neighborhoodStr,
      prices: project?.fields?.prices,
      price: `$${minPrice} - $${maxPrice}`,
      lat: project?.projectAddressMapLocation?.lat,
      lng: project?.projectAddressMapLocation?.lon,
      type: project?.projectType?.type,
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
    allContentfulProject(filter: { isSoldOut: { eq: false } }) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          maxBeds
          maxBaths
          prices
          squareFootages
          neighborhood
        }
        projectType {
          type
        }
        projectPreviewImage {
          ...SearchImage
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
  }
`;
