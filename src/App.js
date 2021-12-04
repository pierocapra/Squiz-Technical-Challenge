import React, { useState, useEffect, useReducer } from "react";

import Title from "./components/Title";
import Sorting from "./components/Sorting";
import Filter from "./components/Filter";
import CompaniesContainer from "./components/CompaniesContainer";
import Loading from "./components/Loading";
import Error from "./components/Error";

// GLOBAL VARIABLES
const url = "https://my.api.mockaroo.com/accounts.json?key=3c370320";
const url2 = "https://my.api.mockaroo.com/companies2.json?key=2240b270";

let data = [];
const apiSimulation = [
  {
    id: 1,
    name: "Emard, Armstrong and Lang",
    country: "Philippines",
    industry: "Diversified Commercial Services",
    numberOfEmployees: 203,
  },
  {
    id: 2,
    name: "Keeling-Brakus",
    country: "Iran",
    industry: "Semiconductors",
    numberOfEmployees: 367,
  },
  {
    id: 3,
    name: "Runolfsdottir-Bauch",
    country: "Yemen",
    industry: "n/a",
    numberOfEmployees: 328,
  },
  {
    id: 4,
    name: "Goyette and Sons",
    country: "Sweden",
    industry: "Industrial Specialties",
    numberOfEmployees: 291,
  },
  {
    id: 5,
    name: "Cummings and Sons",
    country: "Mauritius",
    industry: "Metal Fabrications",
    numberOfEmployees: 957,
  },
  {
    id: 6,
    name: "Kuvalis, Auer and Schoen",
    country: "Portugal",
    industry: "Industrial Machinery/Components",
    numberOfEmployees: 529,
  },
  {
    id: 7,
    name: "Gorczany LLC",
    country: "China",
    industry: "Electric Utilities: Central",
    numberOfEmployees: 875,
  },
  {
    id: 8,
    name: "Willms, Boehm and Larkin",
    country: "Portugal",
    industry: "Investment Bankers/Brokers/Service",
    numberOfEmployees: 45,
  },
  {
    id: 9,
    name: "Crona-Champlin",
    country: "Colombia",
    industry: "Biotechnology: Commercial Physical & Biological Resarch",
    numberOfEmployees: 73,
  },
  {
    id: 10,
    name: "Littel, Hilpert and Durgan",
    country: "Poland",
    industry: "EDP Services",
    numberOfEmployees: 756,
  },
  {
    id: 11,
    name: "Jacobs Inc",
    country: "Russia",
    industry: "Specialty Chemicals",
    numberOfEmployees: 833,
  },
  {
    id: 12,
    name: "Kemmer, Durgan and Shanahan",
    country: "Sweden",
    industry: "Department/Specialty Retail Stores",
    numberOfEmployees: 529,
  },
  {
    id: 13,
    name: "Goodwin, Gerlach and Gorczany",
    country: "Indonesia",
    industry: "Biotechnology: Electromedical & Electrotherapeutic Apparatus",
    numberOfEmployees: 756,
  },
  {
    id: 14,
    name: "Thompson, Bauch and Schneider",
    country: "Russia",
    industry: "Homebuilding",
    numberOfEmployees: 425,
  },
  {
    id: 15,
    name: "Kovacek-King",
    country: "Indonesia",
    industry: "Professional Services",
    numberOfEmployees: 346,
  },
  {
    id: 16,
    name: "Cartwright-Breitenberg",
    country: "Japan",
    industry: "Medical/Dental Instruments",
    numberOfEmployees: 977,
  },
  {
    id: 17,
    name: "West, Ortiz and Davis",
    country: "Argentina",
    industry: "Water Supply",
    numberOfEmployees: 43,
  },
  {
    id: 18,
    name: "Rogahn-Schoen",
    country: "Colombia",
    industry: "Finance: Consumer Services",
    numberOfEmployees: 451,
  },
  {
    id: 19,
    name: "Green and Sons",
    country: "Russia",
    industry: "Major Banks",
    numberOfEmployees: 375,
  },
  {
    id: 20,
    name: "Schoen-Stoltenberg",
    country: "Nepal",
    industry: "Other Specialty Stores",
    numberOfEmployees: 149,
  },
];
const reducer = (state, action) => {
  if (action.type === "INITIAL_LOADING") {
    const newList = action.payload;
    return { ...state, isLoading: false, companyList: newList };
  }
  if (action.type === "COUNTRIES_LOADING") {
    const newList = action.payload;
    return { ...state, countryList: newList };
  }
  if (action.type === "INDUSTRIES_LOADING") {
    const newList = action.payload;
    return { ...state, industryList: newList };
  }
  if (action.type === "DISPLAY_FILTER") {
    const newList = action.payload;
    return { ...state, companyList: newList, isSorted: false, sortedBy: "" };
  }
  if (action.type === "SORT_LIST") {
    const newList = action.payload.newList;
    const sortingparameter = action.payload.sortingParameter;
    return {
      ...state,
      companyList: newList,
      isSorted: true,
      sortedBy: sortingparameter,
    };
  }
  if (action.type === "SORT_DIRECTION") {
    const newList = action.payload;
    return { ...state, companyList: newList };
  }
};

const defaultState = {
  isLoading: true,
  companyList: [],
  countryList: [],
  industryList: [],
  isSorted: false,
  sortedBy: "",
};

function App() {
  //reducer
  const [state, dispatch] = useReducer(reducer, defaultState);

  // states
  const [error, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [companyList, setCompanyList] = useState([]);
  const [country, setCountry] = useState("All");
  const [industry, setIndustry] = useState("All");
  // const [countryList, setCountryList] = useState([]);
  // const [industryList, setIndustryList] = useState([]);
  // const [isSorted, setIsSorted] = useState(false);
  // const [sortedBy, setSortedBy] = useState("");

  // Fetchdata from API
  const fetchData = () => {
    fetch(url2)
      .then((response) => response.json())
      .then((result) => {
        data = result;

        dispatch({ type: "INITIAL_LOADING", payload: data });
        // setCompanyList(data);
        populateCountryFilter(data);
        populateIndustryFilter(data);
        // setIsLoading(false);

        return;
      })
      .catch((error) => {
        setError(true);
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
    // setCountryList(allCountries);
    dispatch({ type: "COUNTRIES_LOADING", payload: allCountries });
  };

  const populateIndustryFilter = (data) => {
    const allIndustries = [...new Set(data.map((item) => item.industry))];
    const allIndFilterNA = allIndustries.filter(
      (industry) => industry !== "n/a"
    );
    // setIndustryList(allIndFilterNA);
    dispatch({ type: "INDUSTRIES_LOADING", payload: allIndFilterNA });
  };

  const setCountryState = (value) => {
    setCountry(value);
  };

  const setIndustryState = (value) => {
    setIndustry(value);
  };

  const displayFilter = () => {
    // setIsSorted(false);
    // setSortedBy("");
    if (country === "All" && industry === "All") {
      // setCompanyList(data);
      dispatch({ type: "DISPLAY_FILTER", payload: data });
      return;
    } else if (country === "All") {
      // setCompanyList(data.filter((item) => item.industry === industry));
      dispatch({
        type: "DISPLAY_FILTER",
        payload: data.filter((item) => item.industry === industry),
      });
    } else if (industry === "All") {
      // setCompanyList(data.filter((item) => item.country === country));
      dispatch({
        type: "DISPLAY_FILTER",
        payload: data.filter((item) => item.country === country),
      });
    } else {
      // setCompanyList(
      //   data.filter(
      //     (item) => item.country === country && item.industry === industry
      //   )
      // );
      dispatch({
        type: "DISPLAY_FILTER",
        payload: data.filter(
          (item) => item.country === country && item.industry === industry
        ),
      });
    }
  };

  //
  // Sorting Logic
  //

  const sortHandler = (e) => {
    // setSortedBy(e.target.value);
    const sortingParameter = e.target.value;
    console.log(sortingParameter);
    const newArray = [...state.companyList].sort((a, b) =>
      a[sortingParameter] > b[sortingParameter]
        ? 1
        : b[sortingParameter] > a[sortingParameter]
        ? -1
        : 0
    );
    dispatch({
      type: "SORT_LIST",
      payload: { sortingParameter: e.target.value, newList: newArray },
    });
    // setIsSorted(true);
    // setCompanyList(newArray);
  };

  const sortDirection = () => {
    // setCompanyList([...companyList].reverse());
    dispatch({
      type: "SORT_DIRECTION",
      payload: [...state.companyList].reverse(),
    });
  };

  //
  //
  //

  return (
    <main>
      <Title />
      {error && <Error />}
      {!error && (
        <>
          {state.isLoading && <Loading />}
          {!state.isLoading && (
            <section className="container">
              <div className="header">
                <Filter
                  countryList={state.countryList}
                  industryList={state.industryList}
                  setCountryState={setCountryState}
                  setIndustryState={setIndustryState}
                  displayFilter={displayFilter}
                />
                <Sorting
                  sortHandler={sortHandler}
                  isSorted={state.isSorted}
                  sortDirection={sortDirection}
                  sortedBy={state.sortedBy}
                />
              </div>

              <CompaniesContainer companyList={state.companyList} />
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default App;
