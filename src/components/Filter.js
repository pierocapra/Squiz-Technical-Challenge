import React, { useState } from "react";

const Filter = ({
  countryList,
  industryList,
  setCountryState,
  setIndustryState,
  displayFilter,
}) => {
  return (
    <div className="filter-container">
      <div className="filter-selection">
        <label htmlFor="countries">Country</label>
        <select
          name="countries"
          id="countries"
          onChange={(e) => setCountryState(e.target.value)}
        >
          <option value="All" defaultValue>
            All
          </option>
          {countryList.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </select>
      </div>
      <div className="filter-selection">
        <label htmlFor="industries">Industry</label>
        <select
          name="industries"
          id="industries"
          onChange={(e) => setIndustryState(e.target.value)}
        >
          <option value="All" defaultValue>
            All
          </option>
          {industryList.map((industry, index) => {
            return (
              <option key={index} value={industry}>
                {industry}
              </option>
            );
          })}
        </select>
      </div>
      <button className="filter-btn" onClick={displayFilter}>
        Go
      </button>
    </div>
  );
};

export default Filter;
