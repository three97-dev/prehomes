import React, { useCallback } from "react";
import { graphql } from "gatsby";
import { useSelector, useDispatch } from "react-redux";

import {
  Header,
  ProjectOverview,
  Amenities,
  KeyInformation,
  ExploreTheArea,
  TextSection,
  NeighborhoodMap,
  FormWithSelects,
  FloorPlans,
  HeroSectionSlider,
  Footer,
} from "../components";

import { options } from "../utils/filterOptions";

import { SAVE_PROJECT_TRIGGER } from "../redux/actions/save-project";
import { DELETE_PROJECT_TRIGGER } from "../redux/actions/save-project";

const ProjectPageTemplate = ({ data }) => {
  const projectPageData = data.contentfulProjectPage;
  const project = data.contentfulProject;

  const dispatch = useDispatch();
  const saveProject = useSelector(state => state.saveProject);
  const session = useSelector(state => state.session);
  const isFavorite = saveProject.savedProjects.some(projectId => projectId === project.contentful_id);

  const saveUnsaveProjectButton = useCallback(() => {
    if (isFavorite) {
      dispatch({ type: DELETE_PROJECT_TRIGGER, email: session.email, projectId: project.contentful_id });
    } else {
      dispatch({ type: SAVE_PROJECT_TRIGGER, email: session.email, projectId: project.contentful_id });
    }
  }, [isFavorite, session, dispatch]);

  return (
    <>
      <Header logoLink="/" />
      <HeroSectionSlider
        images={project.projectImages}
        topText={projectPageData.heroTopText}
        title={project.projectName}
        saveButton={projectPageData.heroSaveButtonLabel}
        requestButton={projectPageData.heroRequestButtonLabel}
        isFavorite={isFavorite}
        onClickSave={saveUnsaveProjectButton}
        isFixedHeader
        className="bg-transparent"
      />
      <ProjectOverview
        title={projectPageData.overviewTitle}
        address={project.projectAddress}
        content={project.overviewText}
        minPrice={project.projectMinPrice}
        maxPrice={project.projectMaxPrice}
        priceSQFT={project.pricePerSqft}
        priceNeighborhood={project.priceNeighborhoodAverage}
        priceCity={project.priceCityAverage}
        labelPriceSQFT={projectPageData.overviewPriceSqftLabel}
        labelPriceNeighborhood={projectPageData.overviewPriceNeighborhoodLabel}
        labelPriceCity={projectPageData.overviewPriceCityLabel}
        buttonLabel={projectPageData.overviewButtonLabel}
        videoLink={project.overviewVideoLink}
        videoPreviewImage={project.overviewVideoPreviewImage}
        className="overflow-hidden"
      />
      <ExploreTheArea
        title={projectPageData.additionalDescriptionTitle}
        walkScoreLabel={projectPageData.scores.walkScore.label}
        walkScoreTooltip={projectPageData.scores.walkScore.tooltip}
        bikeScoreLabel={projectPageData.scores.bikeScore.label}
        bikeScoreTooltip={projectPageData.scores.bikeScore.tooltip}
        busScoreLabel={projectPageData.scores.busScore.label}
        busScoreTooltip={projectPageData.scores.busScore.tooltip}
        walkScoreNumber={project.fields.walkScore === "none" ? null : project.fields.walkScore}
        bikeScoreNumber={project.fields.bikeScore === "none" ? null : project.fields.bikeScore}
        busScoreNumber={project.fields.transitScore === "none" ? null : project.fields.transitScore}
        className="pb-31px"
      />
      <TextSection content={project.additionalDescription} className="px-25px lg:px-120px bg-transparent" />
      <NeighborhoodMap geoLocation={project.projectAddressMapLocation} className="pt-40px bg-transparent" />

      <div className="border-t-2 md:border-t md:mx-25px lg:mx-120px border-gray-border md:my-40px"></div>
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
        floors={project.projectFloorPlans}
        projectData={project}
        projectNameLabel={projectPageData.modalProjectNameLabel}
        suiteNameLabel={projectPageData.suiteNameColumnTitle}
        squareFootageLabel={projectPageData.modalSquareFootageLabel}
        bedroomsLabel={projectPageData.modalBedroomsLabel}
        bathroomsLabel={projectPageData.modalBathroomsLabel}
        modalProjectPrice={projectPageData.priceColumnTitle}
        saveFloorPlanButtonLabel={projectPageData.modalSaveButtonLabel}
        requestInfoButtonLabel={projectPageData.heroRequestButtonLabel}
        isProject
        className="mx-auto bg-transparent"
      />
      <div className="hidden md:block border-t md:mx-25px lg:mx-120px md:mt-42px border-gray-border"></div>
      <KeyInformation
        title={projectPageData.keyInformationTitle}
        statusLabel={projectPageData.keyInformationStatusLabel}
        statusValue={project.fields.projectStatus}
        labelPriceSQFT={projectPageData.overviewPriceSqftLabel}
        pricePerSqft={project.pricePerSqft}
        typeLabel={projectPageData.keyInformationTypeLabel}
        typeValue={project.projectType.name}
        launchDateLabel={projectPageData.keyInformationLaunchDateLabel}
        launchDateValue={project.launchDate}
        estimatedOccupancyLabel={projectPageData.keyInformationEstimatedOccupancyLabel}
        estimatedOccupancyValue={project.estimatedOccupancy}
        majorIntersectionLabel={projectPageData.keyInformationMajorIntersectionLabel}
        majorIntersectionValue={project.majorIntersection}
        architectsLabel={projectPageData.keyInformationArchitectsLabel}
        architectsValue={project.architects}
        depositLabel={projectPageData.keyInformationDepositLabel}
        depositValue={project.deposit}
        cashDepositLabel={projectPageData.keyInformationCashDepositLabel}
        cashDepositValue={project.cashDeposit}
        depositStructureLabel={projectPageData.keyInformationDepositStructureLabel}
        depositStructureValue={project.depositStructure}
        lockerMaintenanceLabel={projectPageData.keyInformationLockerMaintenanceLabel}
        lockerMaintenanceValue={project.lockerMaintenance}
        className="bg-transparent"
      />
      <div className="border-t md:mx-25px lg:mx-120px border-gray-border mt-30px md:mt-0px mb-30px md:mb-0px"></div>
      {project.amenities ? (
        <Amenities
          title={projectPageData.amenitiesTitle}
          amenities={project.amenities}
          className="pb-40px px-25px lg:px-120px"
        />
      ) : null}
      {/* <FormWithSelects
        title="Looking for a Condo?"
        content="Fill out the form below and provide some details about your search and we’ll assign someone to help out."
        firstNameInputLabel="First Name"
        firstNameInputPlaceholder="Placeholder Text"
        lastNameInputLabel="Last Name"
        lastNameInputPlaceholder="Placeholder Text"
        emailInputLabel="Email Address"
        emailInputPlaceholder="Placeholder Text"
        phoneInputLabel="Phone Number"
        phoneInputPlaceholder="Placeholder Text"
        dropdownRealtorLabel="Are you a realtor?"
        dropdownRealtorPlaceholder="Placeholder Text"
        dropdownRealtorOptions={options}
        dropdownPurchaseLabel="Type of  purchase?"
        dropdownPurchasePlaceholder="Placeholder Text"
        dropdownPurchaseOptions={options}
        dropdowHearAboutUsLabel="Where did you hear about us?"
        dropdownHearAboutUsPlaceholder="Placeholder Text"
        dropdowHearAboutUsOptions={options}
        buttonLabel="Button Text"
        className=""
      /> */}
      <Footer />
    </>
  );
};

export default ProjectPageTemplate;

export const query = graphql`
  query ProjectTemplate($project_contentful_id: String!) {
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
      scores {
        walkScore {
          label
          tooltip
        }
        bikeScore {
          label
          tooltip
        }
        busScore {
          label
          tooltip
        }
      }
    }
    contentfulProject(contentful_id: { eq: $project_contentful_id }) {
      contentful_id
      projectName
      projectImages {
        ...Image
      }
      projectAddress
      projectAddressMapLocation {
        lat
        lon
      }
      overviewText {
        raw
      }
      overviewVideoLink
      overviewVideoPreviewImage {
        ...Image
      }
      projectMinPrice
      projectMaxPrice
      pricePerSqft
      priceNeighborhoodAverage
      priceCityAverage
      additionalDescription {
        raw
      }
      projectFloorPlans {
        contentful_id
        squareFootage
        bedrooms
        bathrooms
        name
        price
        priceForSquareFootage
        isAvailable
        floorPlanImage {
          ...Image
        }
      }
      fields {
        projectStatus
        walkScore
        bikeScore
        transitScore
      }
      projectType {
        name
      }
      launchDate
      estimatedOccupancy
      majorIntersection {
        raw
      }
      architects {
        raw
      }
      deposit {
        raw
      }
      cashDeposit
      depositStructure {
        raw
      }
      lockerMaintenance
      amenities {
        label
      }
    }
  }
`;
