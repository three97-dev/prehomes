import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Text from "../basic/text/Text";
import MapsComponent from "../maps-component/MapsComponent";

import ImageBackgroundTablet from "../../../assets/old_assets/pages/contacts/map-bg-tablet.svg";
import ImageBackgroundWeb from "../../../assets/old_assets/pages/contacts/map-bg-web.svg";
import ImageBackgroundWebhd from "../../../assets/old_assets/pages/contacts/map-bg-webhd.svg";

import "./ContactsMap.css";

const ContactsMap = ({
  title,
  address,
  addressContent,
  phone,
  phoneContent,
  email,
  emailContent,
  location,
  googleMapsCredentials,
  className,
  ...otherProps
}) => {
  return (
    <div
      className={`grid justify-items-center lg+:justify-items-stretch w-full overflow-y-hidden ${className}`}
      {...otherProps}
    >
      <div className="grid relative location-grid-mobile sm+:location-grid-tablet md+:location-grid-desc lg+:location-grid-hd py-50px sm+:py-100px md+:py-120px">
        <img
          src={ImageBackgroundTablet}
          alt="background"
          className="hidden sm+:block md+:hidden absolute -z-10 sm+:bottom-310px sm+:right-254px max-w-none"
        />
        <img
          src={ImageBackgroundWeb}
          alt="background"
          className="hidden md+:block lg+:hidden absolute -z-10 md+:-bottom-107px md+:right-475px max-w-none"
        />
        <img
          src={ImageBackgroundWebhd}
          alt="background"
          className="hidden lg+:block absolute -z-10 lg+:-bottom-80px lg+:right-924px max-w-none"
        />
        <div className="location-contacts-area sm+:flex md+:block self-center">
          <div className="mb-20px sm+:mt-1px md+:mt-0px md+:mb-20px">
            <Text typography="h2">{title}</Text>
          </div>
          <div className="sm+:ml-115px md+:ml-0px">
            <div className="flex mb-19px md+:mb-20px">
              <Text typography="body">{address}</Text>
              <Text typography="body" className="mr-20px ml-14px sm+:ml-18px md+:ml-25px lg+:ml-70px md+:w-205px">
                {addressContent}
              </Text>
            </div>
            <div className="flex mb-19px md+:mb-18px">
              <Text typography="body">{phone}</Text>
              <Text
                typography="body"
                color="text-tile-bg-3"
                className="mr-20px ml-28px sm+:ml-33px lg+:ml-84px md+:ml-38px"
              >
                {phoneContent}
              </Text>
            </div>
            <div className="flex">
              <Text typography="body">{email}</Text>
              <Text
                typography="body"
                color="text-tile-bg-3"
                className="mr-20px ml-33px sm+:ml-37px lg+:ml-90px md+:ml-43px"
              >
                {emailContent}
              </Text>
            </div>
          </div>
        </div>
        <div className="location-map-area h-241px sm+:h-509px md+:h-406px lg+:h-602px w-full mt-50px sm+:mt-75px md+:mt-0px">
          <MapsComponent location={location} googleMapsCredentials={googleMapsCredentials} />
        </div>
      </div>
    </div>
  );
};

ContactsMap.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  addressContent: PropTypes.string,
  phone: PropTypes.string,
  phoneContent: PropTypes.string,
  email: PropTypes.string,
  emailContent: PropTypes.string,
  location: PropTypes.object,
  googleMapsCredentials: PropTypes.object,
};

ContactsMap.defaultProps = {
  title: "some title",
  address: "some address",
  addressContent: "some addressContent",
  phone: "some phone",
  phoneContent: "some phoneContent",
  email: "some email",
  emailContent: "some emailContent",
};

export default ContactsMap;

// export const query = graphql`
//   fragment ContactsMap on ContentfulContactsMap {
//     title
//     addressTitle
//     addressValue
//     phoneTitle
//     phoneValue
//     emailTitle
//     emailValue
//     googleMapsCredentials {
//       id
//       googleMapsApiKey
//     }
//     location {
//       lat
//       lon
//     }
//   }
// `;
