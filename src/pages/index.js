import React from "react";
import { graphql } from "gatsby";

import {
  Header,
  HeroHome,
  PrestigeCollectionSliderSection,
  SliderSmallTiles,
  ViewByLinks,
  ContactRealtorFormSection,
  Footer,
  ViewLargeTilesSection,
} from "../components";

const IndexPage = ({ data }) => {
  const homePageData = data.contentfulHomePage;
  const developmentsByCityLinks = data.developmentsByCityLinks.links.columns;
  const projectsByDeveloperLinks = data.projectsByDeveloperLinks.links.columns;
  const newestReleasesProjects = data.newestReleasesProjects.nodes;
  const launchingSoonProjects = data.launchingSoonProjects.nodes;
  const premiumProjects = data.premiumProjects.nodes;
  const prestigeProjects = data.prestigeProjects.nodes;

  const firstTile = {
    link: homePageData.townhouseLink,
    image: homePageData.townhousePreviewImage,
    title: homePageData.townhouseTitle,
    description: homePageData.townhouseSubtitle,
    viewAll: homePageData.propertyTypeViewAllButtonLabel,
  };
  const secondTile = {
    link: homePageData.condoLink,
    image: homePageData.condoPreviewImage,
    title: homePageData.condoTitle,
    description: homePageData.condoSubtitle,
    viewAll: homePageData.propertyTypeViewAllButtonLabel,
  };
  const thirdTile = {
    link: homePageData.detachedHomeLink,
    image: homePageData.detachedHomesPreviewImage,
    title: homePageData.detachedHomesTitle,
    description: homePageData.detachedHomesSubtitle,
    viewAll: homePageData.propertyTypeViewAllButtonLabel,
  };

  const inputAutocompleteItems = [
    {
      label: "New York, New York, United States",
      subtitle: "Location",
      link: "/",
    },
    { label: "Lorem Ipsum", subtitle: "Location", link: "/" },
    { label: "Lorem Ipsum", subtitle: "Location", link: "/" },
    { label: "Lorem Ipsum", subtitle: "Architect in New York", link: "/" },
    { label: "Lorem Ipsum", subtitle: "Developer and Builder in New York", link: "/" },
  ];
  return (
    <>
      <Header logoLink="/" variant="home" />
      <HeroHome
        title={homePageData.heroTitle}
        image={homePageData.heroImage}
        inputAutocompleteItems={inputAutocompleteItems}
        placeholder={homePageData.searchPlaceholder}
        bottomText={homePageData.videoLinkLabel}
        bottomTextUnderline={homePageData.videoLinkLabelUnderline}
      />
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle={homePageData.platinumAccessProjectsSliderTitle}
        helpMarkTooltip={homePageData.platinumAccessProjectsSliderTooltip}
        showHelpMark={true}
        smallTileData={newestReleasesProjects}
        bgWrapperClasses="bg-light-gray mx-auto"
        paddingTitleClasses="pt-95px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      <ViewByLinks title={homePageData.viewDevelopmentsByCity} links={developmentsByCityLinks} />
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle={homePageData.newestReleasesSliderTitle}
        helpMarkTooltip={homePageData.newestReleasesSliderTooltip}
        showHelpMark={true}
        smallTileData={newestReleasesProjects}
        bgWrapperClasses="bg-light-gray mx-auto"
        paddingTitleClasses="pt-95px"
        paddingSliderClasses="pt-70px"
      />
      <SliderSmallTiles
        arrowsColor="dark-orange"
        mainTitle={homePageData.launchingSoonSliderTitle}
        helpMarkTooltip={homePageData.launchingSoonSliderTooltip}
        showHelpMark={true}
        smallTileData={launchingSoonProjects}
        bgWrapperClasses="bg-light-gray mx-auto"
        paddingTitleClasses="pt-70px"
        paddingSliderClasses="pt-70px pb-50px"
      />
      <ViewByLinks title={homePageData.viewProjectsByDeveloper} links={projectsByDeveloperLinks} />
      <ViewLargeTilesSection
        title={homePageData.searchByPropertyType}
        firstTile={firstTile}
        secondTile={secondTile}
        thirdTile={thirdTile}
      />
      <PrestigeCollectionSliderSection
        title={homePageData.prestigeSliderTitle}
        subtitle={homePageData.prestigeSliderSubtitle}
        link={homePageData.prestigeSliderLink}
        linkLabel={homePageData.prestigeSliderLinkLabel}
        projects={premiumProjects}
      />
      <PrestigeCollectionSliderSection
        title={homePageData.premiumSliderTitle}
        subtitle={homePageData.premiumSliderSubtitle}
        link={homePageData.premiumSliderLink}
        linkLabel={homePageData.premiumSliderLinkLabel}
        projects={prestigeProjects}
        blackVariant
      />
      <ContactRealtorFormSection />
      <Footer />
    </>
  );
};
export default IndexPage;

export const query = graphql`
  query {
    contentfulHomePage(isTemplateSample: { ne: true }) {
      heroTitle
      searchPlaceholder
      videoLinkLabel
      videoLinkLabelUnderline
      heroImage {
        ...Image
      }
      platinumAccessProjectsSliderTitle
      platinumAccessProjectsSliderTooltip
      viewDevelopmentsByCity
      newestReleasesSliderTitle
      newestReleasesSliderTooltip
      launchingSoonSliderTitle
      launchingSoonSliderTooltip
      viewProjectsByDeveloper
      searchByPropertyType
      townhousePreviewImage {
        ...SearchImage
      }
      townhouseTitle
      townhouseSubtitle
      townhouseLink
      condoPreviewImage {
        ...SearchImage
      }
      condoTitle
      condoSubtitle
      condoLink
      detachedHomesPreviewImage {
        ...SearchImage
      }
      detachedHomesTitle
      detachedHomesSubtitle
      detachedHomeLink
      propertyTypeViewAllButtonLabel
      prestigeSliderTitle
      prestigeSliderSubtitle
      prestigeSliderLink
      prestigeSliderLinkLabel
      premiumSliderTitle
      premiumSliderSubtitle
      premiumSliderLink
      premiumSliderLinkLabel
    }
    developmentsByCityLinks: contentfulViewByLinks(
      isTemplateSample: { ne: true }
      contentful_id: { eq: "2S8Kg18rPYTpffWMMJmuzN" }
    ) {
      links {
        columns {
          label
          url
        }
      }
    }
    projectsByDeveloperLinks: contentfulViewByLinks(
      isTemplateSample: { ne: true }
      contentful_id: { eq: "2uerc7Heo2j9jBJAklhIjW" }
    ) {
      links {
        columns {
          label
          url
        }
      }
    }
    newestReleasesProjects: allContentfulProject(
      filter: { isTemplateSample: { ne: true }, fields: { projectStatus: { eq: "newest-releases" } } }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    launchingSoonProjects: allContentfulProject(
      filter: { isTemplateSample: { ne: true }, fields: { projectStatus: { eq: "launching-soon" } } }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    premiumProjects: allContentfulProject(
      filter: { isTemplateSample: { ne: true }, projectCollection: { eq: "Premium" } }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectPreviewShortText
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
    prestigeProjects: allContentfulProject(
      filter: { isTemplateSample: { ne: true }, projectCollection: { eq: "Prestige" } }
    ) {
      nodes {
        contentful_id
        projectName
        projectCity {
          cityName
        }
        fields {
          pageUrl
        }
        projectPreviewShortText
        projectMinPrice
        projectPreviewImage {
          ...SearchImage
        }
      }
    }
  }
`;
