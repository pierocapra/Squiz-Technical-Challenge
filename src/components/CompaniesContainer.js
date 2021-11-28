import React from "react";
import CompanyDetail from "./CompanyDetail";

const CompaniesContainer = ({ companyList }) => {
  return (
    <>
      {companyList.length <= 0 && (
        <h3 className="alert-no-match">No result is matching your criteria!</h3>
      )}
      {companyList.length > 0 && (
        <article className="results-container">
          <ul>
            {companyList.map((company) => {
              return <CompanyDetail key={company.id} {...company} />;
            })}
          </ul>
        </article>
      )}
    </>
  );
};

export default CompaniesContainer;
