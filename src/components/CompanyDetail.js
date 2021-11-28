import React from "react";

const CompanyDetail = ({ id, name, country, industry, numberOfEmployees }) => {
  return (
    <li key={id} className="company-info">
      <h3>{name}</h3>
      <h4>{country}</h4>
      <p>
        <strong>Industry: </strong> {industry}
      </p>
      <p>
        <strong>Number of Employees:</strong> {numberOfEmployees}
      </p>
    </li>
  );
};

export default CompanyDetail;
