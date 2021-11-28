import React, { useState, useEffect } from "react";

import Title from "./components/Title";
import Sorting from "./components/Sorting";
import Filter from "./components/Filter";
import CompaniesContainer from "./components/CompaniesContainer";
import Loading from "./components/Loading";

// GLOBAL VARIABLES
const url = "https://my.api.mockaroo.com/accounts.json?key=3c370320";
const url2 = "https://my.api.mockaroo.com/companies2.json?key=2240b270";

let data = [];

function App() {
  // states
  const [isLoading, setIsLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [country, setCountry] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [countryList, setCountryList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [sortedBy, setSortedBy] = useState("");

  // Fetchdata from API
  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        data = result;
        setCompanyList(data);
        populateCountryFilter(data);
        populateIndustryFilter(data);
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //
  //FIltering logic
  //

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

  const setCountryState = (value) => {
    setCountry(value);
  };

  const setIndustryState = (value) => {
    setIndustry(value);
  };

  const displayFilter = () => {
    setIsSorted(false);
    setSortedBy("");
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

  //
  // Sorting Logic
  //

  const sortHandler = (e) => {
    setSortedBy(e.target.value);
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
    setCompanyList([...companyList].reverse());
  };

  //
  //
  //

  return (
    <main>
      <Title />
      {isLoading && <Loading />}
      {!isLoading && (
        <section className="container">
          <div className="header">
            <Filter
              countryList={countryList}
              industryList={industryList}
              setCountryState={setCountryState}
              setIndustryState={setIndustryState}
              displayFilter={displayFilter}
            />
            <Sorting
              sortHandler={sortHandler}
              isSorted={isSorted}
              sortDirection={sortDirection}
              sortedBy={sortedBy}
            />
          </div>

          <CompaniesContainer companyList={companyList} />
        </section>
      )}
    </main>
  );
}

export default App;
