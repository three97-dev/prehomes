const hubSpotProperties = [
  "project_id",
  "project_name",
  "project_address",
  "project_images",
  "latitude",
  "longitude",
  "overview_text",
  "overview_video_link",
  "additional_description",
  "google_drive_link",
  "cooperating_commission",
  "project_type",
  "launch_date",
  "estimated_occupancy",
  "major_intersection",
  "architects",
  "deposit_amount",
  "locker_price",
  "deposit_structure",
  "locker_maintenance",
  "maintenance_fee",
  "parking_price",
  "total_suites",
  "parking_maintenance",
  "amenities",
  "overview_video_preview_image",
  "max_baths",
  "max_beds",
  "neighborhood",
  "page_url",
  "project_max_price",
  "project_min_price",
  "bike_score",
  "transit_score",
  "walk_score",
  "project_status",
  "price_per_square_foot",
];

const recursiveTreeProcess = tree => {
  let newResult = "";

  for (const treeNode of tree.content) {
    if (treeNode.nodeType === "paragraph") {
      if (newResult === "") {
        newResult += recursiveTreeProcess(treeNode);
      } else {
        newResult += recursiveTreeProcess(treeNode);
        newResult += "\n";
      }
    } else if (treeNode.nodeType === "text") {
      newResult += treeNode.value;
    } else {
      newResult += recursiveTreeProcess(treeNode);
    }
  }

  return newResult;
};

const fromContentfulRichTextToString = richText => {
  if (!richText) {
    return undefined;
  }
  try {
    const rawTree = JSON.parse(richText.raw);
    const str = recursiveTreeProcess(rawTree);

    //console.log("test", str);

    return str;
  } catch (err) {
    console.log(`Failed to process Contentful rich text to string:`, err);
  }
};

const toHubSpotProjectProperties = project => {
  return {
    project_id: project.contentful_id,
    project_name: project.projectName,
    project_address: project.projectAddress,
    project_images: project.projectImages?.file?.url,
    latitude: project.projectAddressMapLocation.lat,
    longitude: project.projectAddressMapLocation.lon,
    overview_text: fromContentfulRichTextToString(project.overviewText),
    overview_video_link: project.overviewVideoLink,
    additional_description: fromContentfulRichTextToString(project.additionalDescription),
    google_drive_link: project.googleDriveLink,
    cooperating_commission: project.cooperatingCommission,
    project_type: project.projectType?.name,
    launch_date: project.launchDate,
    estimated_occupancy: project.estimatedOccupancy,
    major_intersection: fromContentfulRichTextToString(project.majorIntersection),
    architects: fromContentfulRichTextToString(project.architects),
    deposit_amount: fromContentfulRichTextToString(project.depositAmount),
    locker_price: project.lockerPrice,
    deposit_structure: fromContentfulRichTextToString(project.depositStructure),
    locker_maintenance: project.lockerMaintenance,
    maintenance_fee: project.maintenanceFee,
    parking_price: project.parkingPrice,
    total_suites: fromContentfulRichTextToString(project.totalSuites),
    parking_maintenance: project.parkingMaintenance,
    amenities: project.amenities?.label,
    overview_video_preview_image: project.overviewVideoPreviewImage?.file?.url,
    max_baths: project.fields?.maxBaths,
    max_beds: project.fields?.maxBeds,
    neighborhood: project.fields?.neighborhood,
    page_url: project.fields?.pageUrl,
    project_max_price: project.fields?.projectMaxPrice,
    project_min_price: project.fields?.projectMinPrice,
    bike_score: project.fields?.bikeScore,
    transit_score: project.fields?.transitScore,
    walk_score: project.fields?.walkScore,
    project_status: project.fields?.projectStatus,
    price_per_square_foot: project.fields?.pricePerSqft,
  };
};

const mapOverProjectProperties = project => {
  const object = {};
  hubSpotProperties.map(property => {
    object[property] = project[property] || project[property] === 0 ? project[property].toString() : "";
  });
  return object;
};

module.exports = {
  hubSpotProperties,
  toHubSpotProjectProperties,
  mapOverProjectProperties,
};
