import React from "react";
import { graphql } from "gatsby";

import { Header, SearchSection } from "../components";

const SearchPage = ({ data }) => {
  const searchPageData = data.contentfulSearchPage;
  const projects = data.allContentfulProject.nodes;

  const allProjects = projects.map(project => {
    const minPrice = project.fields.prices[0].toLocaleString();
    const maxPrice = project.fields.prices[project.fields.prices.length - 1].toLocaleString();

    return {
      id: project.contentful_id,
      image: project.projectPreviewImage,
      title: project.projectName,
      city: project.projectCity.cityName,
      neighborhood: "Neighborhood",
      prices: project.fields.prices,
      price: `$${minPrice} - $${maxPrice}`,
      lat: project.projectAddressMapLocation.lat,
      lng: project.projectAddressMapLocation.lon,
      type: project.projectType.type,
      maxBeds: project.fields.maxBeds,
      maxBaths: project.fields.maxBaths,
      squareFootages: project.fields.squareFootages,
      link: project.fields.pageUrl,
    };
  });

  return (
    <>
      <Header logoLink="/" className="" />
      <SearchSection
        searchPlaceholder={searchPageData.searchPlaceholder}
        typeFilterTitle={searchPageData.typeFilterTitle}
        bedsFilterTitle={searchPageData.bedsFilterTitle}
        bathsFilterTitle={searchPageData.bathsFilterTitle}
        minPriceFilterTitle={searchPageData.minPriceFilterTitle}
        maxPriceFilterTitle={searchPageData.maxPriceFilterTitle}
        minSizeFilterTitle={searchPageData.minSizeFilterTitle}
        maxSizeFilterTitle={searchPageData.maxSizeFilterTitle}
        searchForLabel={searchPageData.searchFor}
        resultsLabel={searchPageData.results}
        noResultsLabel={searchPageData.noResults}
        modalTitle={searchPageData.modalTitle}
        clearButtonLabel={searchPageData.clearButtonLabel}
        applyButtonLabel={searchPageData.applyButtonLabel}
        allProjects={allProjects}
      />
    </>
  );
};

export default SearchPage;

export const query = graphql`
  query {
    contentfulSearchPage(isTemplateSample: { ne: true }) {
      searchPlaceholder
      typeFilterTitle
      bedsFilterTitle
      bathsFilterTitle
      minPriceFilterTitle
      maxPriceFilterTitle
      minSizeFilterTitle
      maxSizeFilterTitle
      searchFor
      results
      noResults
      modalTitle
      clearButtonLabel
      applyButtonLabel
    }
    allContentfulProject(filter: { isTemplateSample: { ne: true } }) {
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
