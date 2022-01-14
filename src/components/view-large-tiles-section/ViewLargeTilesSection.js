import React from "react";
import Slider from "react-slick";

import LargeTile from "../large-tile/LargeTile";

import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

const ViewLargeTilesSection = ({ title, firstTile, secondTile, thirdTile }) => {
  const isDesktop = useApplyAfterWidth(1365);
  const tiles = [firstTile, secondTile, thirdTile];

  const settings = {
    slidesToShow: 1,
    initialSlide: 1,
    infinite: false,
    arrows: false,
    touchMove: true,
    swipeToSlide: true,
    centerMode: true,
    variableWidth: true,
  };

  const largeTiles = tiles.map((tile, index) => (
    <LargeTile
      key={index}
      link={tile.link}
      image={tile.image}
      title={tile.title}
      description={tile.description}
      viewAll={tile.viewAll}
    />
  ));

  return (
    <div className="bg-light-gray lg:px-121px">
      {isDesktop ? (
        <>
          <h2 className="text-black-gray text-center pt-85px pb-60px">{title}</h2>
          <div className="grid justify-items-center text-center grid-cols-3 gap-x-38px max-w-1126px mx-auto pb-77px">
            {largeTiles}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-black-gray md:text-center pt-50px px-25px md:px-120px">{title}</h2>
          <Slider className="w-full relative" {...settings}>
            {largeTiles}
          </Slider>
        </>
      )}
    </div>
  );
};

export default ViewLargeTilesSection;
