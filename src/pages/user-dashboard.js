import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import axios from "axios";
import { useSelector } from "react-redux";

import { Header, HeroSection, SliderSmallTiles, ContactRealtorFormSection, FloorPlans, Footer } from "../components";
import { options } from "../utils/filterOptions";

const UserDashboardPage = ({ data }) => {
  const dashboardPageData = data.contentfulDashboardPage;
  const projectPageData = data.contentfulProjectPage;

  const [favoriteProjects, setFavoriteProjects] = useState(null);
  const [favoriteFloorPlans, setFavoriteFloorPlans] = useState(null);

  const session = useSelector(state => state.session);

  useEffect(() => {
    async function fetchPageData(email) {
      try {
        const [projectsRes, floorPlansRes] = await Promise.all([
          axios.post("/.netlify/functions/getFavoriteProjectsResolved", { email }),
          axios.post("/.netlify/functions/getFavoriteFloorPlansResolved", { email }),
        ]);
        setFavoriteProjects(projectsRes.data);
        setFavoriteFloorPlans(floorPlansRes.data);
      } catch (err) {
        console.error("Failed to fetch page data:", err);
      }
    }
    if (session.isLoggedIn) {
      fetchPageData(session.email);
    }
  }, [session, setFavoriteProjects, setFavoriteFloorPlans]);

  return (
    <div>
      <Header logoLink="/" />
      <HeroSection
        image={dashboardPageData.heroImage}
        title={session.name ? `${dashboardPageData.heroTitle}, ${session.name}` : null}
      />
      {favoriteProjects ? (
        <SliderSmallTiles
          arrowsColor="black-gray-2"
          mainTitle={dashboardPageData.myFavoritesLabel}
          showHelpMark={true}
          smallTileData={favoriteProjects}
          bgWrapperClasses="bg-transparent"
          paddingTitleClasses="pt-95px"
          paddingSliderClasses="pt-70px pb-50px"
        />
      ) : null}

      {favoriteFloorPlans ? (
        <FloorPlans
          title={projectPageData.floorPlansTitle}
          subtitle={projectPageData.floorPlansSubtitle}
          available={projectPageData.floorPlansAvailable}
          options={options}
          sizeFilterTitle={projectPageData.sizeFilterTitle}
          bedsFilterTitle={projectPageData.bedsFilterTitle}
          bathsFilterTitle={projectPageData.bathsFilterTitle}
          availabilityFilterTitle={projectPageData.availabilityFilterTitle}
          floorNoResults={projectPageData.floorNoResults}
          suiteNameColumnTitle={projectPageData.suiteNameColumnTitle}
          suiteTypeColumnTitle={projectPageData.suiteTypeColumnTitle}
          sizeColumnTitle={projectPageData.sizeColumnTitle}
          priceColumnTitle={projectPageData.priceColumnTitle}
          suiteNameColumnBedroomLabel={projectPageData.suiteNameColumnBedroomLabel}
          suiteNameColumnBathroomLabel={projectPageData.suiteNameColumnBathroomLabel}
          sizeColumnUnits={projectPageData.sizeColumnUnits}
          priceColumnUnits={projectPageData.priceColumnUnits}
          moreInfoButtonLabel={projectPageData.moreInfoButtonLabel}
          floors={favoriteFloorPlans}
          projectData={{ projectName: favoriteFloorPlans.length > 0 ? favoriteFloorPlans[0].projectName : "" }}
          projectNameLabel={projectPageData.modalProjectNameLabel}
          suiteNameLabel={projectPageData.suiteNameColumnTitle}
          squareFootageLabel={projectPageData.modalSquareFootageLabel}
          bedroomsLabel={projectPageData.modalBedroomsLabel}
          bathroomsLabel={projectPageData.modalBathroomsLabel}
          modalProjectPrice={projectPageData.priceColumnTitle}
          saveFloorPlanButtonLabel={projectPageData.modalSaveButtonLabel}
          requestInfoButtonLabel={projectPageData.heroRequestButtonLabel}
          className="mx-auto"
        />
      ) : null}
      <ContactRealtorFormSection />
      <Footer />
    </div>
  );
};

export default UserDashboardPage;

export const query = graphql`
  query {
    contentfulDashboardPage(isTemplateSample: { ne: true }) {
      heroTitle
      heroImage {
        ...Image
      }
      myFavoritesLabel
    }
    contentfulProjectPage(isTemplateSample: { ne: true }) {
      heroTopText
      heroSaveButtonLabel
      heroRequestButtonLabel
      overviewTitle
      overviewPriceSqftLabel
      overviewPriceNeighborhoodLabel
      overviewPriceCityLabel
      overviewButtonLabel
      additionalDescriptionTitle
      floorPlansTitle
      floorPlansSubtitle
      floorPlansAvailable
      sizeFilterTitle
      bedsFilterTitle
      bathsFilterTitle
      availabilityFilterTitle
      floorNoResults
      suiteNameColumnTitle
      suiteTypeColumnTitle
      sizeColumnTitle
      priceColumnTitle
      suiteNameColumnBedroomLabel
      suiteNameColumnBathroomLabel
      sizeColumnUnits
      priceColumnUnits
      moreInfoButtonLabel
      modalProjectNameLabel
      modalSquareFootageLabel
      modalBedroomsLabel
      modalBathroomsLabel
      modalSaveButtonLabel
      keyInformationTitle
      keyInformationStatusLabel
      keyInformationTypeLabel
      keyInformationLaunchDateLabel
      keyInformationEstimatedOccupancyLabel
      keyInformationMajorIntersectionLabel
      keyInformationArchitectsLabel
      keyInformationDepositLabel
      keyInformationCashDepositLabel
      keyInformationDepositStructureLabel
      keyInformationLockerMaintenanceLabel
      amenitiesTitle
    }
  }
`;
