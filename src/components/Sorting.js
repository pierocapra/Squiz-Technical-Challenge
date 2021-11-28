import React, { useState } from "react";

import revArrows from "../img/Reverse-arrows.png";

const Sorting = ({ sortHandler, isSorted, sortDirection }) => {
  return (
    <div className="sorting-area" onClick={sortHandler}>
      <span className="sort-by">Sort By:</span>

      <div>
        <div>
          <input type="radio" id="name" name="sorting" value="name" /> {" "}
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="radio"
            id="noe"
            name="sorting"
            value="numberOfEmployees"
          />
            <label htmlFor="noe">Number of Employees</label>
        </div>
      </div>

      {isSorted && (
        <button className="btn-invert" onClick={sortDirection}>
          <img src={revArrows} alt="Reverse order" title="Reverse Order" />
        </button>
      )}
    </div>
  );
};

export default Sorting;
