import React from "react";
import ReactPaginate from "react-paginate";

import SliderArrow from "../basic/slider-arrow/SliderArrow";

import { useIsDesktop } from "../../utils/useApplyAfterWidth";

import "./Paginator.css";

const Paginator = ({ pageCount, handlePageClick }) => {
  const isDesktop = useIsDesktop();
  return (
    <div>
      <ReactPaginate
        previousLabel={
          isDesktop ? (
            <SliderArrow color="#212121" />
          ) : (
            <button className="w-50px sm:w-80px text-center link-font text-dark-green prev-next-button-outline">Prev</button>
          )
        }
        nextLabel={
          isDesktop ? (
            <SliderArrow rotate={true} color="#212121" />
          ) : (
            <button className="w-50px sm:w-80px text-center link-font font-bold text-dark-green prev-next-button-outline cursor-pointer">
              Next
            </button>
          )
        }
        onPageChange={handlePageClick}
        pageCount={pageCount}
        breakClassName="mr-10px button-outline-none cursor-pointer"
        className={`paginate-block flex justify-center items-center relative`} //style of all paginate block
        pageClassName="link-font text-black pr-9px button-outline-none cursor-pointer" //style of all paginate numbers
        activeClassName="active-page" //style of active number
        previousClassName={isDesktop ? "absolute left-142px button-outline-none cursor-pointer" : "absolute left-35px"}
        nextClassName={isDesktop ? "absolute right-142px button-outline-none cursor-pointer" : "absolute right-35px"}
      />
    </div>
  );
};

export default Paginator;
