import React from "react";
import ReactPaginate from "react-paginate";

import SliderArrow from "../basic/slider-arrow/SliderArrow";

import { useIsDesktop } from "../../utils/useApplyAfterWidth";

import "./Paginator.css";

const Paginator = ({ pageCount, handlePageClick }) => {
  const isDesktop = useIsDesktop();
  console.log(isDesktop);
  return (
    <div>
      <ReactPaginate
        previousLabel={
          isDesktop ? (
            <SliderArrow color="#212121" />
          ) : (
            <button className="w-80px text-center text-14px leading-26px font-bold text-dark-green font-metropolis">
              Prev
            </button>
          )
        }
        nextLabel={
          isDesktop ? (
            <SliderArrow rotate={true} color="#212121" />
          ) : (
            <button className="w-80px text-center text-14px leading-26px font-bold text-dark-green font-metropolis">
              Next
            </button>
          )
        }
        onPageChange={handlePageClick}
        pageCount={pageCount}
        className={`paginate-block flex justify-center items-center relative`} //style of all paginate block
        pageClassName="text-14px md:text-16px leading-24px text-black font-metropolis pr-9px" //style of all paginate numbers
        activeClassName="font-bold" //style of active number
        previousClassName={isDesktop ? "absolute left-142px" : "absolute left-35px"}
        nextClassName={isDesktop ? "absolute right-142px" : "absolute right-35px"}
      />
    </div>
  );
};

export default Paginator;
