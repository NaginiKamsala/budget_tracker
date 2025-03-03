import React, { useEffect } from "react";
import { handleDecrement, handleIncrement } from "../GlobalState/Reducer";
import "../styles/pagination.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
function Pagination({ count, setCount, maxCount }) {
  useEffect(() => {
    console.log(maxCount, count);
  });
  return (
    <div className="paginationMainContainer">
      <div className="leftArrowWrapper">
        <GoArrowLeft onClick={() => handleDecrement(setCount)} />
      </div>
      <div className="countWrapper">
        <p>{count / 3}</p>
      </div>
      <div className="rightArrowWrapper">
        <GoArrowRight onClick={() => handleIncrement(setCount, maxCount)} />
      </div>
    </div>
  );
}

export default Pagination;
