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
// import Seo from "../seo/Seo";

const ProjectPageTemplate = ({ data }) => {
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
      {/* <Seo
        seo={{
          seoTitle: project.projectName,
          seoDescription: project.projectAddress,
        }}
      /> */}
      <Header logoLink="/" />
      <HeroSectionSlider
        images={project.projectImages}
        topText="PROJECT VIEW"
        title={project.projectName}
        saveButton="Save Listing"
        requestButton="Request Info"
        isFavorite={isFavorite}
        onClickSave={saveUnsaveProjectButton}
        isFixedHeader
        className="bg-transparent"
      />
      <ProjectOverview
        title="Overview"
        address={project.projectAddress}
        content={project.overviewText}
        minPrice={project.projectMinPrice}
        maxPrice={project.projectMaxPrice}
        priceSQFT={project.pricePerSqft}
        priceNeighborhood={project.priceNeighborhoodAverage}
        priceCity={project.priceCityAverage}
        labelPriceSQFT="Price per sq.ft:"
        labelPriceNeighborhood="Neighborhood average:"
        labelPriceCity="City average"
        buttonLabel="Watch Video"
        videoLink={project.overviewVideoLink}
        videoPreviewImage={project.overviewVideoPreviewImage}
        className="overflow-hidden"
      />
      <ExploreTheArea
        title="Explore the Area"
        walkScoreLabel="Walk Score"
        walkScoreTooltip="Walk Score Tooltip"
        bikeScoreLabel="Bike Score"
        bikeScoreTooltip="Bike Score Tooltip"
        busScoreLabel="Bus Score"
        busScoreTooltip="Bus Score Tooltip"
        walkScoreNumber={project.fields.walkScore === "none" ? null : project.fields.walkScore}
        bikeScoreNumber={project.fields.bikeScore === "none" ? null : project.fields.bikeScore}
        busScoreNumber={project.fields.transitScore === "none" ? null : project.fields.transitScore}
        className="pb-31px"
      />
      <TextSection content={project.additionalDescription} className="px-25px lg:px-120px bg-transparent" />
      <NeighborhoodMap geoLocation={project.projectAddressMapLocation} className="pt-40px bg-transparent" />

      <div className="border-t-2 md:border-t md:mx-25px lg:mx-120px border-gray-border md:my-40px"></div>
      <FloorPlans
        options={options}
        projectData={project}
        floors={project.projectFloorPlans}
        isProject
        className="mx-auto bg-transparent"
      />
      <div className="hidden md:block border-t md:mx-25px lg:mx-120px md:mt-42px border-gray-border"></div>
      <KeyInformation
        title="Key Information"
        statusLabel="Status"
        statusValue={project.fields.projectStatus}
        labelPriceSQFT="Price per sq.ft:"
        pricePerSqft={project.pricePerSqft}
        typeLabel="Type"
        typeValue={project.projectType.name}
        launchDateLabel="Launch Date"
        launchDateValue={project.launchDate}
        estimatedOccupancyLabel="Occupancy"
        estimatedOccupancyValue={project.estimatedOccupancy}
        majorIntersectionLabel="Major Intersection"
        majorIntersectionValue={project.majorIntersection}
        architectsLabel="Architects"
        architectsValue={project.architects}
        depositLabel="Deposit"
        depositValue={project.deposit}
        cashDepositLabel="Cash Deposit"
        cashDepositValue={project.cashDeposit}
        depositStructureLabel="Deposit Structure"
        depositStructureValue={project.depositStructure}
        lockerMaintenanceLabel="Locker Maintenance"
        lockerMaintenanceValue={project.lockerMaintenance}
        className="bg-transparent"
      />
      <div className="border-t md:mx-25px lg:mx-120px border-gray-border mt-30px md:mt-0px mb-30px md:mb-0px"></div>
      {project.amenities ? (
        <Amenities title="Amenities" amenities={project.amenities} className="pb-40px px-25px lg:px-120px" />
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
        isAvailable
        floorPlanImage {
          ...Image
        }
        fields {
          pricePerSquareFoot
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
