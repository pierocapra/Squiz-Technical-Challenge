import React from "react";

const CompanyDetail = ({ id, name, country, industry, numberOfEmployees }) => {
  return (
    <li key={id} className="company-info">
      <h3>{name}</h3>
      <h4>{country}</h4>
      <p>Industry: {industry}</p>
      <p>Number of Employees: {numberOfEmployees}</p>
    </li>
  );
};

export default CompanyDetail;
