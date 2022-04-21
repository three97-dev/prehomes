import React, { useCallback, useState, useEffect } from "react";
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
  FloorPlans,
  HeroSectionSlider,
  Footer,
  ContactRealtorFormSection,
  InformationPanel,
  RegisterForProject,
} from "../components";

import { options } from "../utils/filterOptions";

import { SAVE_PROJECT_TRIGGER } from "../redux/actions/save-project";
import { DELETE_PROJECT_TRIGGER } from "../redux/actions/save-project";
// import Seo from "../seo/Seo";

const ProjectPageTemplate = ({ data }) => {
  const project = data.contentfulProject;

  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showFullInfoPanel, setShowFullInfoPanel] = useState(false);

  const dispatch = useDispatch();
  const saveProject = useSelector(state => state.saveProject);
  const session = useSelector(state => state.session);
  const isFavorite = saveProject.savedProjects.some(projectId => projectId === project.contentful_id);

  useEffect(() => {
    if (session) {
      const isAgent = session.email?.includes("@thezadegangroup.com");
      setShowInfoPanel(isAgent);

      const isPrivilegeAgent =
        session.email === "jonathan@thezadegangroup.com" ||
        session.email === "daniel@thezadegangroup.com" ||
        session.email === "ari@thezadegangroup.com" ||
        session.email === "mike@thezadegangroup.com";
      setShowFullInfoPanel(isPrivilegeAgent);
    }
  }, [session]);

  const saveUnsaveProjectButton = useCallback(() => {
    if (isFavorite) {
      dispatch({ type: DELETE_PROJECT_TRIGGER, email: session.email, projectId: project.contentful_id });
    } else {
      dispatch({ type: SAVE_PROJECT_TRIGGER, email: session.email, projectId: project.contentful_id });
    }
  }, [isFavorite, session, project, dispatch]);

  return (
    <div
      style={{
        backgroundColor: "#FBFBFB",
      }}
    >
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
        videoLink={project.overviewVideoLink}
      />
      {project.googleDriveLink && showInfoPanel ? (
        <InformationPanel
          title="Agent Information Panel"
          googleDriveLinkLabel="Google Drive Link"
          googleDriveLinkValue={project.googleDriveLink}
          salesCentreEmailLabel="Sales Centre Email"
          salesCentreEmailValue={project.salesCentreEmail}
          salesCentrePhoneLabel="Sales Centre Phone"
          salesCentrePhoneValue={project.salesCentrePhone}
          cooperatingCommissionLabel="Cooperating Commission"
          cooperatingCommissionValue={project.cooperatingCommission}
          showFullInfoPanel={showFullInfoPanel}
        />
      ) : null}
      <ProjectOverview
        title="Overview"
        address={project.projectAddress}
        content={project.overviewText}
        minPrice={project.fields.projectMinPrice}
        maxPrice={project.fields.projectMaxPrice}
        priceSQFT={project.fields.pricePerSqft}
        priceNeighborhood={project.fields.priceNeighborhoodAverage}
        priceCity={project.fields.priceCityAverage}
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
        className="pb-16px"
      />
      <TextSection content={project.additionalDescription} className="px-25px lg:px-120px" />
      <NeighborhoodMap
        geoLocation={project.projectAddressMapLocation}
        className="pb-64px mt-16px px-25px lg:px-120px bg-transparent"
      />
      <RegisterForProject
        additionalFields={[
          {
            name: "projectName",
            value: project.projectName,
          },
        ]}
      />
      <FloorPlans
        options={options}
        projectData={project}
        floors={project.projectFloorPlans}
        isProject
        title="Floor Plans &amp; Prices"
        className="pt-64px mx-auto bg-transparent"
      />
      <KeyInformation
        title="Project Information"
        statusLabel="Status"
        statusValue={project.fields.projectStatus}
        labelPriceSQFT="Price per sq.ft:"
        pricePerSqft={project.fields.pricePerSqft}
        typeLabel={project?.projectTypes?.lenght < 1 ? "Type" : "Types"}
        typeValue={project?.projectTypes}
        launchDateLabel="Launch Date"
        launchDateValue={project.launchDate}
        estimatedOccupancyLabel="Occupancy"
        estimatedOccupancyValue={project.estimatedOccupancy}
        majorIntersectionLabel="Major Intersection"
        majorIntersectionValue={project.majorIntersection}
        architectsLabel="Architects"
        architectsValue={project.architects}
        depositAmountLabel="Deposit Amount"
        depositAmountValue={project.depositAmount}
        lockerPriceLabel="Locker Price"
        lockerPriceValue={project.lockerPrice}
        depositStructureLabel="Deposit Structure"
        depositStructureValue={project.depositStructure}
        lockerMaintenanceLabel="Locker Maintenance"
        lockerMaintenanceValue={project.lockerMaintenance}
        maintenanceFeeLabel="Maintenance Fee"
        maintenanceFeeValue={project.maintenanceFee}
        parkingPriceLabel="Parking Price"
        parkingPriceValue={project.parkingPrice}
        totalSuitesLabel="Total Suites"
        totalSuitesValue={project.totalSuites}
        parkingMaintenanceLabel="Parking Maintenance"
        parkingMaintenanceValue={project.parkingMaintenance}
        className="bg-transparent py-64px"
      />
      {project.amenities ? (
        <>
          <Amenities title="Amenities" amenities={project.amenities} className="pb-64px px-25px lg:px-120px" />
        </>
      ) : null}
      <ContactRealtorFormSection
        additionalFields={[
          {
            name: "project_name",
            value: project.projectName,
          },
        ]}
        className="rounded-t-100px"
      />
      <Footer />
    </div>
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
        pageUrl
        walkScore
        bikeScore
        transitScore
        projectMinPrice
        projectMaxPrice
        pricePerSqft
        priceCityAverage
        priceNeighborhoodAverage
      }
      googleDriveLink
      salesCentreEmail
      salesCentrePhone
      cooperatingCommission
      launchDate
      estimatedOccupancy
      majorIntersection {
        raw
      }
      architects {
        raw
      }
      depositAmount {
        raw
      }
      lockerPrice
      depositStructure {
        raw
      }
      lockerMaintenance
      maintenanceFee
      parkingPrice
      totalSuites {
        raw
      }
      parkingMaintenance
      amenities {
        label
      }
    }
  }
`;
