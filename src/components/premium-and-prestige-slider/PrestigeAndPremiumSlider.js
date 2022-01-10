import React, { useState, useCallback } from "react";
import Slider from "react-slick";

import PremiumAndPrestigeTile from "../premium-and-prestige-tile/PremiumAndPrestigeTile";
import SliderArrow from "../basic/slider-arrow/SliderArrow";

const PrestigeAndPremiumSlider = ({ title, projects, blackVariant }) => {
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);

  const settings = {
    prevArrow: <SliderArrow classNames="prev-arrow" />,
    nextArrow: <SliderArrow rotate={true} classNames="next-arrow" />,
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
          centerMode: true,
          variableWidth: true,
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

  return (
    <div className="w-full">
      <div className="flex justify-between text-peach-colour mb-70px w-full">
        <div className="min-w-370px mr-20px font-metropolis white-pink font-bold text-23px md:text-29px leading-24px md:leading-29px">
          {title}
        </div>
        <div className="w-full lg:pl-104px">
          <hr className="mt-14px ml-auto" />
        </div>
      </div>
      <div className="pb-95px">
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
