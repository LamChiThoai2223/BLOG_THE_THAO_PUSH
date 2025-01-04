import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteSport,
  softDeleteSport,
  restoreSport,
  fetchSports,
  fetchSportsPaginator,
  fetchSportsDeletePaginator,
} from "../../../services/Sports";
import { apiUrl } from "../../../config/Api";
import Paginator from "../Paginator";
import { ToastContainer, toast } from "react-toastify";
import {
  Remove as RemoveSportModal,
  ConfirmModal,
  ConfirmRestore as ConfirmRestoreSportModal,
} from "../../Dialog";
import "./styles.css";
import SearchBar from "../../search";
import { Helmet } from "react-helmet";

const SportsList = () => {
  const [sportData, setSportData] = useState([]);
  const [sportDataPagi, setSportDataPagi] = useState([]);
  const [sportDataDelete, setSportDataDelete] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("option-1");
  const [currentPageDelete, setCurrentPageDelete] = useState(1);
  const [lastPageDeleted, setLastPageDeleted] = useState(1);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmRestoreModal, setShowConfirmRestoreModal] = useState(false);
  const [sportIdToDelete, setSportIdToDelete] = useState(null);
  const [deleteSportId, setDeleteSportId] = useState(null);
  const [sportIdToRemove, setSportIdToRemove] = useState(null);
  const [sportIdToRestore, setSportIdToRestore] = useState(null);
  const [table, setTable] = useState(false);
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const title = "Sport";
  console.log(sportDataDelete);

  // const fetchSportsData = (page) => {
  //   fetchSports(apiUrl, page, setSportData, setError)
  //     .then((response) => {
  //       if (response && response.meta) {
  //         setLastPage(response.meta.last_page);
  //       } else {
  //         console.error("API response missing 'meta' or 'last_page'");
  //         setLastPage(1);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching sports:", err);
  //       setError("Error fetching sports");
  //     });
  // };

  const fetchSportsPagi = (page = 1, search = searchKeywords) => {
    fetchSportsPaginator(apiUrl, page, search, setSportData, setError)
      .then((response) => {
        if (response && response.meta) {
          setLastPage(response.meta.last_page);
        } else {
          console.error("API response missing 'meta' or 'last_page'");
          setLastPage(1);
        }
      })
      .catch((err) => {
        console.error("Error fetching sports:", err);
        setError("Error fetching sports");
      });
  };

  const fetchSportsPaginatorDelete = (page = 1, search = searchKeywords) => {
    fetchSportsDeletePaginator(
      apiUrl,
      page,
      search,
      setSportDataDelete,
      setError
    )
      .then((response) => {
        if (response && response.meta) {
          setLastPageDeleted(response.meta.last_page);
        } else {
          console.error("API response missing 'meta' or 'last_page'");
          setLastPageDeleted(1);
        }
      })
      .catch((err) => {
        console.error("Error fetching sports:", err);
        setError("Error fetching sports");
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setCurrentPageDelete(1);
    if (table) {
      fetchSportsPagi(1, searchKeywords);
    } else {
      fetchSportsPaginatorDelete(1, searchKeywords);
    }
  };

  useEffect(
    () => {
      setTable(true);
      fetchSportsPagi(currentPage, searchKeywords);
    },
    [currentPage],
    [searchKeywords]
  );

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("Selected option:", e.target.value);
  };

  const handleDownload = () => {
    console.log("Download CSV clicked");
  };

  const handleDelete = (sportId) => {
    setSportIdToDelete(sportId);
    setShowConfirmModal(true);
    fetchSportsPaginatorDelete(currentPageDelete, searchKeywords);
  };

  const handleSoftDelete = (sportId) => {
    setSportIdToRemove(sportId);
    setShowRemoveModal(true);
    fetchSportsPagi(currentPageDelete, searchKeywords);
  };

  const handleRestore = (sportId) => {
    setSportIdToRestore(sportId);
    setShowConfirmRestoreModal(true);
    fetchSportsPaginatorDelete(currentPageDelete, searchKeywords);
  };

  const handleCloseRemoveModal = () => {
    setShowRemoveModal(false);
    setReason("");
    setDeleteSportId(null);
  };

  const handleDeleteConfirmation = (id) => {
    setSportIdToDelete(id);
    setShowRemoveModal(true);
  };

  const softDeleteSportHandler = async () => {
    try {
      await softDeleteSport(apiUrl, sportIdToRemove, setSportData);
      toast.success("Sport deleted successfully!", { autoClose: 1000 });
      fetchSports(apiUrl, currentPage, setSportData, setError, setLastPage);
      setShowRemoveModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting sport.");
    }
  };

  const confirmRestoreHandler = async () => {
    try {
      await restoreSport(apiUrl, sportIdToRestore, setSportData);
      toast.success("Sport restored successfully!", { autoClose: 1000 });
      fetchSports(apiUrl, currentPage, setSportData, setError, setLastPage);
      setShowConfirmRestoreModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error restoring category.");
    }
  };

  const deleteSportHandler = async () => {
    try {
      await deleteSport(apiUrl, sportIdToDelete, setSportData);
      toast.success("Sport permanently deleted!", { autoClose: 1000 });
      fetchSports(apiUrl, currentPage, setSportData, setError, setLastPage);
      setShowConfirmModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error permanently deleting category.");
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>List Sports</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto d-flex align-items-center justify-content-between w-100">
                  <span className="profile-info-author-title me-3">
                    List Sports
                  </span>

                  <form
                    className="table-search-form d-flex align-items-center me-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  ></form>
                  <SearchBar
                    searchKeywords={searchKeywords}
                    setSearchKeywords={setSearchKeywords}
                    handleSubmit={handleSearchSubmit}
                    handleOptionChange={handleOptionChange}
                    selectedOption={selectedOption}
                    handleDownload={handleDownload}
                  />
                  <div className="btn buttonAddColorGreenItem" onClick={() => navigate("/admin/sports/add")}>
                    <i className="bi bi-plus-circle"></i> Add
                  </div>
                </div>
              </div>
              <nav
                id="categories-table-tab"
                className="categories-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
              >
                <a
                  className="flex-sm-fill text-sm-center nav-link active"
                  id="categories-all-tab"
                  data-bs-toggle="tab"
                  href="#categories-all"
                  role="tab"
                  aria-controls="categories-all"
                  aria-selected="true"
                  onClick={() => {
                    setCurrentPage(1);
                    fetchSportsPagi(currentPage, "");
                    setSearchKeywords("");
                    setTable(true);
                  }}
                >
                  All
                </a>
                <a
                  className="flex-sm-fill text-sm-center nav-link"
                  id="categories-deleted-tab"
                  data-bs-toggle="tab"
                  href="#categories-deleted"
                  role="tab"
                  aria-controls="categories-deleted"
                  aria-selected="false"
                  onClick={() => {
                    setCurrentPageDelete(1);
                    fetchSportsPaginatorDelete(currentPageDelete, "");
                    setSearchKeywords("");
                    setTable(false);
                  }}
                >
                  Deleted Sports
                </a>
              </nav>

              <div className="tab-content" id="categories-table-tab-content">
                <div
                  className="tab-pane fade show active"
                  id="categories-all"
                  role="tabpanel"
                  aria-labelledby="categories-all-tab"
                >
                  <div className="app-card app-card-users-table shadow-sm mb-5">
                    <div className="app-card-body">
                      <div className="table-responsive">
                        <table className="table app-table-hover mb-0 text-left">
                          <thead>
                            <tr>
                              <th className="cell">#</th>
                              <th className="cell">Name</th>
                              <th className="cell">Description</th>
                              <th className="cell">Images</th>
                              <th className="cell"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {sportData.length > 0 ? (
                              sportData.map((sport, index) => {
                                let imagesArray = [];
                                try {
                                  imagesArray = JSON.parse(sport.images).map(
                                    (image) => image.replace(/(^")|("$)/g, "")
                                  );
                                } catch (error) {
                                  console.error(
                                    "Error parsing images JSON:",
                                    error
                                  );
                                }

                                return (
                                  <tr key={index}>
                                    <td className="cell">
                                      {" "}
                                      {(currentPage - 1) * 10 + index + 1}
                                    </td>{" "}
                                    {/* Số thứ tự */}
                                    <td className="cell">
                                      <span className="truncate">
                                        {sport.name}
                                      </span>
                                    </td>
                                    <td className="cell">
                                      {sport.description}
                                    </td>
                                    <td className="cell">
                                      <div className="image-container">
                                        {imagesArray
                                          .slice(0, 3)
                                          .map((image, imgIndex) => (
                                            <img
                                              key={imgIndex}
                                              src={image}
                                              alt={`Sport Image ${imgIndex + 1
                                                }`}
                                              className={`image-preview image-${imgIndex}`}
                                            />
                                          ))}
                                        {imagesArray.length > 3 && (
                                          <span className="more-images">
                                            +{imagesArray.length - 3}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="cell d-flex">
                                      <Link
                                        className="btn-sm app-btn-secondary m-2"
                                        to={`/admin/sports/edit/${sport.sport_id}`}
                                      >
                                        <i className="fa-regular fa-pen-to-square"></i>
                                      </Link>
                                      <button
                                        className="btn-sm app-btn-secondary m-2"
                                        onClick={() =>
                                          handleSoftDelete(sport.sport_id)
                                        }
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center">
                                  No deleted sport found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <Paginator
                    currentPage={currentPage}
                    lastPage={lastPage}
                    setCurrentPage={setCurrentPage}
                    fetchData={fetchSportsPagi}
                  />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="categories-deleted"
                role="tabpanel"
                aria-labelledby="categories-deleted-tab"
              >
                <div className="app-card app-card-users-table mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table app-table-hover mb-0 text-left">
                        <thead>
                          <tr>
                            <th className="cell">#</th>
                            <th className="cell">Name</th>
                            <th className="cell">Description</th>
                            <th className="cell">Images</th>
                            <th className="cell"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sportDataDelete.length > 0 ? (
                            sportDataDelete.map((sport, index) => {
                              let imagesArray = [];
                              try {
                                imagesArray = JSON.parse(sport.images).map(
                                  (image) => image.replace(/(^")|("$)/g, "")
                                );
                              } catch (error) {
                                console.error(
                                  "Error parsing images JSON:",
                                  error
                                );
                              }

                              return (
                                <tr key={index}>
                                  <td className="cell">
                                    {" "}
                                    {(currentPageDelete - 1) * 10 + index + 1}
                                  </td>{" "}
                                  {/* Số thứ tự */}
                                  <td className="cell">
                                    <span className="truncate">
                                      {sport.name}
                                    </span>
                                  </td>
                                  <td className="cell">{sport.description}</td>
                                  <td className="cell">
                                    <div className="image-container">
                                      {imagesArray
                                        .slice(0, 3)
                                        .map((image, imgIndex) => (
                                          <img
                                            key={imgIndex}
                                            src={image}
                                            alt={`Sport Image ${imgIndex + 1}`}
                                            className={`image-preview image-${imgIndex}`}
                                          />
                                        ))}
                                      {imagesArray.length > 3 && (
                                        <span className="more-images">
                                          +{imagesArray.length - 3}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="cell d-flex">
                                    <button
                                      className="btn-sm app-btn-secondary m-2"
                                      onClick={() =>
                                        handleRestore(sport.sport_id)
                                      }
                                    >
                                      <i className="bi bi-arrow-clockwise"></i>
                                    </button>
                                    <button
                                      className="btn-sm app-btn-secondary m-2"
                                      onClick={() =>
                                        handleDelete(sport.sport_id)
                                      }
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">
                                No deleted sport found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <Paginator
                  currentPage={currentPageDelete}
                  lastPage={lastPageDeleted}
                  setCurrentPage={setCurrentPageDelete}
                  fetchData={fetchSportsPaginatorDelete}
                />
              </div>
            </div>
            <ToastContainer />
            {showRemoveModal && (
              <RemoveSportModal
                title={title}
                show={showRemoveModal}
                handleClose={() => setShowRemoveModal(false)}
                handleSoftDelete={softDeleteSportHandler}
              />
            )}
            {showConfirmModal && (
              <ConfirmModal
                title={title}
                show={showConfirmModal}
                handleClose={() => setShowConfirmModal(false)}
                handleDelete={deleteSportHandler}
              />
            )}
            {showConfirmRestoreModal && (
              <ConfirmRestoreSportModal
                title={title}
                show={showConfirmRestoreModal}
                handleClose={() => setShowConfirmRestoreModal(false)}
                handleRestore={confirmRestoreHandler}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SportsList;
