import React, { useState, useEffect } from "react";
import CompanyDetail from "./components/CompanyDetail";
import Title from "./components/Title";

import revArrows from "./img/Reverse-arrows.png";

// GLOBAL VARIABLES
const url = "https://my.api.mockaroo.com/accounts.json?key=3c370320";
const url2 = "https://my.api.mockaroo.com/companies.json?key=2240b270";
const apiSimulation = [
  {
    id: 1,
    name: "Swoon",
    country: "Italy",
    industry: "Manufacture",
    numberOfEmployees: 35,
  },
  {
    id: 2,
    name: "Marty",
    country: "Poland",
    industry: "n/a",
    numberOfEmployees: 100,
  },
  {
    id: 3,
    name: "Gucci",
    country: "Italy",
    industry: "Textile",
    numberOfEmployees: 135,
  },
  {
    id: 4,
    name: "Levis",
    country: "US",
    industry: "Textile",
    numberOfEmployees: 1135,
  },
  {
    id: 5,
    name: "Marea",
    country: "Greece",
    industry: "Music",
    numberOfEmployees: 15,
  },
  {
    id: 6,
    name: "Merrel",
    country: "UK",
    industry: "Manufacture",
    numberOfEmployees: 305,
  },
  {
    id: 7,
    name: "Treble",
    country: "US",
    industry: "Audio",
    numberOfEmployees: 3500,
  },
  {
    id: 8,
    name: "Merci",
    country: "UK",
    industry: "Charity",
    numberOfEmployees: 30005,
  },
];

let data = [];
// data = apiSimulation;

function App() {
  const [companyList, setCompanyList] = useState([]);
  const [country, setCountry] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [countryList, setCountryList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const fetchData = () => {
    fetch(url2)
      .then((response) => response.json())
      .then((result) => {
        data = result;
        setCompanyList(data);
        populateCountryFilter(data);
        populateIndustryFilter(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const populateCountryFilter = (data) => {
    const allCountries = [...new Set(data.map((item) => item.country))];
    setCountryList(allCountries);
  };

  const populateIndustryFilter = (data) => {
    const allIndustries = [...new Set(data.map((item) => item.industry))];
    const allIndFilterNA = allIndustries.filter(
      (industry) => industry !== "n/a"
    );
    setIndustryList(allIndFilterNA);
  };

  const displayFilter = () => {
    if (country === "All" && industry === "All") {
      setCompanyList(data);
      return;
    } else if (country === "All") {
      setCompanyList(data.filter((item) => item.industry === industry));
    } else if (industry === "All") {
      setCompanyList(data.filter((item) => item.country === country));
    } else {
      setCompanyList(
        data.filter(
          (item) => item.country === country && item.industry === industry
        )
      );
    }
  };

  const sortHandler = (e) => {
    const sortingParameter = e.target.value;
    console.log(sortingParameter);
    const newArray = [...companyList].sort((a, b) =>
      a[sortingParameter] > b[sortingParameter]
        ? 1
        : b[sortingParameter] > a[sortingParameter]
        ? -1
        : 0
    );

    setIsSorted(true);
    setCompanyList(newArray);
  };

  const sortDirection = () => {
    setCompanyList(companyList.reverse());
  };

  return (
    <main>
      <Title />
      <section className="container">
        <header>
          <div className="filter-container">
            <div className="filter-selection">
              <label htmlFor="countries">Country</label>
              <select
                name="countries"
                id="countries"
                onChange={(e) => setCountry(e.target.value)}
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
                onChange={(e) => setIndustry(e.target.value)}
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
            <button className="btn" onClick={displayFilter}>
              Go
            </button>
          </div>
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
                <img src={revArrows} alt="Reverse order" />
              </button>
            )}
          </div>
        </header>

        {companyList.length <= 0 && (
          <h3 className="alert-no-match">
            No result is matching your criteria!
          </h3>
        )}
        {companyList.length > 0 && (
          <article className="results-container">
            <ul>
              {companyList.map((company) => {
                return <CompanyDetail {...company} />;
              })}
            </ul>
          </article>
        )}
      </section>
    </main>
  );
}

export default App;
