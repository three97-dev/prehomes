import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import SliderArrow from "../../basic/slider-arrow/SliderArrow";
import PremiumAndPrestigeTile from "../../premium-and-prestige-tile/PremiumAndPrestigeTile";
import SmallTile from "../../small-tile/SmallTile";

import UniversalLink from "../../../utils/UniversalLink";
import useApplyAfterWidth from "../../../utils/useApplyAfterWidth";

import flowers from "../../../assets/flower-cream.svg";
import buildings from "../../../assets/buildings.svg";

import "./PrestigeCollectionSliderSection.css";

const PrestigeCollectionSliderSection = ({ title, subtitle, link, linkLabel, projects, blackVariant }) => {
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);
  const isDesktop = useApplyAfterWidth(833);
  const settings = {
    prevArrow: <SliderArrow classNames="prev-arrow" />,
    nextArrow: <SliderArrow rotate={true} classNames="next-arrow" />,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    touchMove: false,
    onInit: useCallback(() => {
      if (slider) {
        setTileCount(slider.innerSlider.props.slidesToShow);
      }
    }, [slider, setTileCount]),
    onReInit: useCallback(() => {
      if (slider.innerSlider.props.slidesToShow !== tileCount) {
        setTileCount(slider.innerSlider.props.slidesToShow);
      }
    }, [slider, tileCount, setTileCount]),
    responsive: [
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 1,
          arrows: false,
          touchMove: true,
          swipeToSlide: true,
          centerMode: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const emptyTiles = (arr, amount) => {
    if (arr.length < amount) {
      let extra = [];
      for (let i = arr.length; i < amount; i++) {
        extra.push(i);
      }
      return extra.map(index => {
        return <div key={index} className="w-251px h-379px mx-auto"></div>;
      });
    }
  };

  return (
    <div className={`w-full py-50px md:py-76px ${blackVariant ? "bg-light-black" : "bg-dark-orange-85"}`}>
      <div className="relative">
        <div
          className={`md:absolute w-full md:w-236px mt-20px px-48px md:mx-48px lg:mx-96px pb-45px md:pb-20px ${
            blackVariant ? "text-cream-pink order-last right-0px" : "text-cream-pink left-0px"
          }`}
        >
          <img src={blackVariant ? buildings : flowers} />
          <p className="text-22px md:text-29px font-metropolis font-bold w-155px leading-29px mt-26px mb-32px">
            {title}
          </p>
          <hr className="rounded border-t-2 border-b mb-23px -mx-12px md:mx-0px" />
          <p className="mb-40px text-14px md:text-16px leading-19px font-rosario font-normal">{subtitle}</p>
          <UniversalLink link={link}>
            <span className="font-rosario font-bold text-14px md:text-16px leading-19px border-b-2 border-current-600 w-max cursor-pointer">
              {linkLabel}
            </span>
          </UniversalLink>
        </div>
        <div
          className={`${
            blackVariant ? "md:mr-313px lg:mr-400px md:ml-45px" : "md:ml-313px lg:ml-400px md:mr-45px"
          } md:px-60px`}
        >
          <Slider className="w-full relative" ref={s => setSlider(s)} {...settings}>
            {projects.map((project, index) => {
              return isDesktop ? (
                <PremiumAndPrestigeTile
                  key={index}
                  id={project.contentful_id}
                  image={project.projectPreviewImage}
                  tileTitle={project.projectName}
                  tileContent={project.projectPreviewShortText}
                  tilePrice={project.projectMinPrice}
                  buttonLink={project.fields.pageUrl}
                  isLikeButton
                  blackVariant={blackVariant ? true : false}
                  className="mx-auto"
                />
              ) : (
                <SmallTile
                  key={index}
                  id={project.contentful_id}
                  image={project.projectPreviewImage}
                  link={project.fields.pageUrl}
                  title={project.projectName}
                  location={project.projectCity.cityName}
                  price={project.projectMinPrice}
                  textColor="text-cream-pink"
                  bgColor={blackVariant ? "bg-white-asphalt" : "bg-dark-green"}
                  className="mb-25px mx-auto"
                />
              );
            })}
            {emptyTiles(projects, tileCount)}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PrestigeCollectionSliderSection;

PrestigeCollectionSliderSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  linkLabel: PropTypes.string,
  viewMoreButtonLabel: PropTypes.string,
  projects: PropTypes.array,
  blackVariant: PropTypes.bool,
};

PrestigeCollectionSliderSection.defaultProps = {
  title: "",
  subtitle: "",
  link: "",
  linkLabel: "",
  viewMoreButtonLabel: "",
  projects: [],
  blackVariant: false,
};
