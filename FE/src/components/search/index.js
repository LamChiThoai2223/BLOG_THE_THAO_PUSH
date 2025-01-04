import React, { useState } from "react";

const SearchBar = ({
  searchKeywords,
  setSearchKeywords,
  handleSubmit,
  handleOptionChange,
  selectedOption,
  handleDownload,
}) => {
  return (
    <div className="col-auto">
      <div className="page-utilities">
        <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
          <div className="col-auto">
            <form className="table-search-form row gx-1 align-items-center" onSubmit={handleSubmit}>
              <div className="col-auto">
                <input
                  type="text"
                  className=""
                  placeholder="Search..."
                  value={searchKeywords}
                  onChange={(e) => setSearchKeywords(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn app-btn-secondary">
                <i class="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
