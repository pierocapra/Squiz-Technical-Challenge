import React from "react";

import revArrows from "../img/Reverse-arrows.png";

const Sorting = ({ sortHandler, isSorted, sortDirection, sortedBy }) => {
  return (
    <div className="sorting-area">
      <span className="sort-by">Sort By:</span>

      <div>
        <div>
          <input
            type="radio"
            id="name"
            name="sorting"
            value="name"
            checked={sortedBy === "name"}
            onChange={sortHandler}
          />
            <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="radio"
            id="noe"
            name="sorting"
            value="numberOfEmployees"
            checked={sortedBy === "numberOfEmployees"}
            onChange={sortHandler}
          />
            <label htmlFor="noe">Number of Employees</label>
        </div>
      </div>

      {isSorted && (
        <button className="btn-invert" onClick={sortDirection}>
          <img src={revArrows} alt="Reverse order" title="Reverse Order" />
          <p>reverse</p>
        </button>
      )}
    </div>
  );
};

export default Sorting;
