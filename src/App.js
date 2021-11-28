import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import Sorting from "./components/Sorting";
import Filter from "./components/Filter";
import CompaniesContainer from "./components/Companies";

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
  //
  //

  const setSortedArray = (newArray) => {
    setCompanyList(newArray);
  };

  const setSortedDirection = (newArray) => {
    setCompanyList(newArray);
  };

  //
  // Sorting Logic
  //

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
    setSortedArray(newArray);
  };

  const sortDirection = () => {
    setSortedDirection(companyList.reverse());
  };

  //
  //
  //

  return (
    <main>
      <Title />
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
          />
        </div>

        <CompaniesContainer companyList={companyList} />
      </section>
    </main>
  );
}

export default App;
