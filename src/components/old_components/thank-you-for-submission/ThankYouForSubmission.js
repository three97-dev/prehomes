import React, { useState, useEffect } from "react";
import { useLocation } from "@reach/router";
import { navigate } from "gatsby-link";

import PropTypes from "prop-types";
import Text from "../basic/text/Text";
import TileShadow from "../basic/tile-shadow/TileShadow";

import IconClose from "../../../assets/old_assets/pages/contact/thank-you-icon-close.svg";

import "./ThankYouForSubmission.css";

const ThankYouForSubmission = ({ title, color, content, className }) => {
  const { search } = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (search && search.length > 0) {
      navigate(`?thank-you`);
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = "hidden";
    }

    return function cleanup() {
      if (showModal) {
        document.body.style.overflowY = "scroll";
        navigate(`/contact`);
      }
    };
  }, [showModal]);

  if (showModal) {
    return (
      <div
        className="fixed z-100 h-full w-full grid justify-items-center top-0px left-0px thank-you-modal-background overflow-y-auto"
        onClick={() => setShowModal(false)}
      >
        <div className="my-auto">
          <div onClick={e => e.stopPropagation()}>
            <TileShadow color={color} hasContentBg={false} className={className}>
              <div className="text-center relative px-36px md:px-180px lg:px-190px xl:px-140px py-75px md:py-100px max-w-318px md:max-w-672px lg:max-w-720px xl:max-w-812px">
                <button onClick={() => setShowModal(false)} className="z-10px p-10px top-10px right-10px absolute">
                  <img src={IconClose} alt="close" className="arrow-shadow w-16px xl:w-18px" />
                </button>
                <Text typography="h2" className="mb-20px">
                  {title}
                </Text>
                <Text typography="body">{content}</Text>
              </div>
            </TileShadow>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

ThankYouForSubmission.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

ThankYouForSubmission.defaultProps = {
  title: "some title",
  content: "some content",
  color: "type3",
  className: "",
};

export default ThankYouForSubmission;
