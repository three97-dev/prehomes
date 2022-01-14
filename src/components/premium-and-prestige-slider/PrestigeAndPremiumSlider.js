import React, { useState, useCallback } from "react";
import Slider from "react-slick";

import PremiumAndPrestigeTile from "../premium-and-prestige-tile/PremiumAndPrestigeTile";
import SliderArrow from "../basic/slider-arrow/SliderArrow";

const PrestigeAndPremiumSlider = ({ title, projects, blackVariant }) => {
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);

  const settings = {
    prevArrow: <SliderArrow classNames="prev-arrow bg-white" />,
    nextArrow: <SliderArrow rotate={true} classNames="next-arrow bg-white" />,
    slidesToShow: 5,
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
          variableWidth: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: 4,
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
        return <div key={index} className="w-251px h-538px mx-auto"></div>;
      });
    }
  };

  return projects.length === 0 ? null : (
    <div className="w-full md:px-112px">
      <div className="flex justify-between items-center text-white-pink mb-50px md:mb-70px lg:mb-110px w-full px-25px md:px-0px">
        <div className="min-w-360px mr-20px">
          <h2 className="text-white-pink">{title}</h2>
        </div>
        <div className="w-full lg:pl-94px lg:pr-10px">
          <hr className="ml-auto" />
        </div>
      </div>
      <div className="pb-50px md:pb-95px">
        <Slider ref={s => setSlider(s)} {...settings}>
          {projects.map((project, index) => {
            return (
              <PremiumAndPrestigeTile
                key={index}
                id={project.contentful_id}
                image={project.projectPreviewImage}
                tileTitle={project.projectName}
                tileContent={project.projectPreviewShortText}
                tilePrice={project.projectMinPrice}
                buttonLink={project.fields.pageUrl}
                buttonLabel="View more"
                location={project.projectCity.cityName}
                className="mx-10px md:mx-auto"
                isLikeButton
                blackVariant={blackVariant ? true : false}
                centerMode={true}
              />
            );
          })}
          {emptyTiles(projects, tileCount)}
        </Slider>
      </div>
    </div>
  );
};

export default PrestigeAndPremiumSlider;
