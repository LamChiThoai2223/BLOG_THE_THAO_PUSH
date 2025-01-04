import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteTag,
  fetchAllPaginator,
  fetchAllDeletedPaginator,
  restore,
  softDelete,
} from "../../../services/Tag";
import Paginator from "../Paginator";
import { apiUrl } from "../../../config/Api";
import "react-toastify/dist/ReactToastify.css";
import {
  Remove as RemoveTagModal,
  ConfirmModal,
  ConfirmRestore as ConfirmRestoreTagModal,
} from "../../Dialog";
import { ToastContainer, toast } from "react-toastify";
import { uniqueId } from "lodash";
import SearchBar from "../../search";
import { Helmet } from "react-helmet";
import LoadingAdmin from "../../loadingAdmin";

const TagsList = () => {
  const [postData, setPostData] = useState([]);
  const [postDataDeleted, setPostDataDeleted] = useState([]);
  const [error, setError] = useState(null);
  const [currentPageDeleted, setCurrentPageDeleted] = useState(1);
  const [lastPageDeleted, setLastPageDeleted] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [selectedOption, setSelectedOption] = useState("option-1");
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmRestoreModal, setShowConfirmRestoreModal] = useState(false);
  const [tagIdToRemove, setTagIdToRemove] = useState(null);
  const [tagIdToRestore, setTagIdToRestore] = useState(null);
  const [tagIdToDelete, setTagIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [table, setTable] = useState(false);
  const title = "Tag";
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const loadTags = (page = 1, search = searchKeywords) => {
    setLoading(true);
    fetchAllPaginator(apiUrl, page, search, setPostData, setError)
      .then((data) => {
        if (data && data.meta) {
          setLastPage(data.meta.last_page);
        } else {
          console.error("API response missing 'meta' or 'last_page'");
          setLastPage(1);
        }
      })
      .catch((err) => {
        console.error("Error fetching tags:", err);
        setError("Error fetching tags");
      });
    setLoading(false);
  };
  const loadTagsDeleted = (page = 1, search = searchKeywords) => {
    setLoading(true);
    fetchAllDeletedPaginator(apiUrl, page, search, setPostDataDeleted, setError)
      .then((data) => {
        if (data && data.meta) {
          setLastPageDeleted(data.meta.last_page);
        } else {
          console.error("API response missing 'meta' or 'last_page'");
          setLastPageDeleted(1);
        }
      })
      .catch((err) => {
        console.error("Error fetching tags:", err);
        setError("Error fetching tags");
      });
    setLoading(false);
  };
  const handleSearchSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setCurrentPage(1);
    setCurrentPageDeleted(1);
    if (table) {
      loadTags(1, searchKeywords);
    } else {
      loadTagsDeleted(1, searchKeywords);
    }
    setLoading(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("Selected option:", e.target.value);
  };

  const handleDownload = () => {
    console.log("Download CSV clicked");
  };

  useEffect(
    () => {
      setTable(true);
      loadTags(currentPage, searchKeywords);
    },
    [currentPage],
    [searchKeywords]
  );

  const handleSoftDelete = (tagId) => {
    setLoading(true);
    setTagIdToRemove(tagId);
    setShowRemoveModal(true);
    loadTags(currentPage, searchKeywords);
    setLoading(false);
  };

  const handleRestore = (tagId) => {
    setLoading(true);
    setTagIdToRestore(tagId);
    setShowConfirmRestoreModal(true);
    loadTagsDeleted(currentPageDeleted, searchKeywords);
    setLoading(false);
  };

  const handleDelete = (tagId) => {
    setLoading(true);
    setTagIdToDelete(tagId);
    setShowConfirmModal(true);
    loadTagsDeleted(currentPageDeleted, searchKeywords);
    setLoading(false);
  };

  const softDeleteTagHandler = async () => {
    setLoading(true);
    try {
      await softDelete(apiUrl, tagIdToRemove, setPostData);
      toast.success("Tag deleted successfully!", {
        toastId: uniqueId("toast-sucess"),
        containerId: "GlobalApplicationToast",
      });

      setShowRemoveModal(false);
      loadTags(currentPage, searchKeywords);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting tag.", {
        toastId: uniqueId("toast-sucess"),
        containerId: "GlobalApplicationToast",
      });
      setLoading(false);
    }
  };

  const confirmRestoreHandler = async () => {
    setLoading(true)
    try {
      await restore(apiUrl, tagIdToRestore, setPostData);
      toast.success("Tag restored successfully!", {
        toastId: uniqueId("toast-sucess"),
        containerId: "GlobalApplicationToast",
      });
      loadTagsDeleted(currentPageDeleted, searchKeywords);
      setShowConfirmRestoreModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error restoring tag.", {
        toastId: uniqueId("toast-sucess"),
        containerId: "GlobalApplicationToast",
      });
      setLoading(false);
    }
  };

  const deleteTagHandler = async () => {
    setLoading(true);
    try {
      await deleteTag(apiUrl, tagIdToDelete, setPostData);
      toast.success("Tag permanently deleted!", {
        toastId: uniqueId("toast-sucess"),
        containerId: "GlobalApplicationToast",
      });
      loadTagsDeleted(currentPageDeleted, searchKeywords);
      setShowConfirmModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error permanently deleting tag.", {
        toastId: uniqueId("toast-sucess"),
        containerId: "GlobalApplicationToast",
      });
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <Helmet>
        <title>List Tag</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto d-flex align-items-center justify-content-between w-100">
                  <span className="profile-info-author-title me-3">
                    List Tags
                  </span>

                  <SearchBar
                    searchKeywords={searchKeywords}
                    setSearchKeywords={setSearchKeywords}
                    handleSubmit={handleSearchSubmit}
                    handleOptionChange={handleOptionChange}
                    selectedOption={selectedOption}
                    handleDownload={handleDownload}
                  />
                  <div
                    className="btn buttonAddColorGreenItem"
                    onClick={() => navigate("/admin/tags/add")}
                  >
                    <i className="bi bi-plus-circle"></i> Add
                  </div>
                </div>
              </div>

              <nav
                id="tags-table-tab"
                className="tags-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
              >
                <a
                  className="flex-sm-fill text-sm-center nav-link active"
                  id="tags-all-tab"
                  data-bs-toggle="tab"
                  href="#tags-all"
                  role="tab"
                  aria-controls="tags-all"
                  aria-selected="true"
                  onClick={() => {
                    setCurrentPage(1);
                    loadTags(currentPage, "");
                    setSearchKeywords("");
                    setTable(true);
                  }}
                >
                  All
                </a>
                <a
                  className="flex-sm-fill text-sm-center nav-link"
                  id="tags-deleted-tab"
                  data-bs-toggle="tab"
                  href="#tags-deleted"
                  role="tab"
                  aria-controls="tags-deleted"
                  aria-selected="false"
                  onClick={() => {
                    setCurrentPageDeleted(1);
                    loadTagsDeleted(currentPageDeleted, "");
                    setSearchKeywords("");
                    setTable(false);
                  }}
                >
                  Deleted tags
                </a>
              </nav>
              <div className="tab-content" id="orders-table-tab-content">
                {/* -------------- Table all ------------- */}
                <div
                  className="tab-pane fade show active"
                  id="tags-all"
                  role="tabpanel"
                  aria-labelledby="tags-all-tab"
                >
                  <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body">
                      <div className="table-responsive">
                        <table className="table app-table-hover mb-0 text-left">
                          <thead>
                            <tr>
                              <th className="cell">#</th>
                              <th className="cell">Name tag</th>
                              <th className="cell"></th>
                            </tr>
                          </thead>
                          <tbody>
                          {loading && <LoadingAdmin />}
                            {postData.length > 0 ? (
                              postData.map((tag, index) => (
                                <tr key={index}>
                                  <td className="cell">
                                    {(currentPage - 1) * 10 + index + 1}
                                  </td>
                                  <td className="cell">
                                    <span className="truncate">
                                      #{tag.name}
                                    </span>
                                  </td>
                                  <td className="cell">
                                    <Link
                                      className="btn-sm app-btn-secondary m-2"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Edit"
                                      to={`edit/${tag.tag_id}`}
                                    >
                                      <i className="fa-regular fa-pen-to-square"></i>
                                    </Link>

                                    <Link
                                      className="btn-sm app-btn-secondary m-2"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Delete"
                                      onClick={() =>
                                        handleSoftDelete(tag.tag_id)
                                      }
                                    >
                                      <i className="bi bi-trash"></i>
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center">
                                  <h3>No data available</h3>
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
                    fetchData={loadTags}
                  />
                </div>
                {/*------------- Table remove ----------*/}
                <div
                  className="tab-pane fade"
                  id="tags-deleted"
                  role="tabpanel"
                  aria-labelledby="tags-deleted-tab"
                >
                  <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body">
                      <div className="table-responsive">
                        <table className="table app-table-hover mb-0 text-left">
                          <thead>
                            <tr>
                              <th className="cell">#</th>
                              <th className="cell">Name tag</th>
                              <th className="cell"></th>
                            </tr>
                          </thead>
                          <tbody>
                          {loading && <LoadingAdmin />}
                            {postDataDeleted.length > 0 ? (
                              postDataDeleted.map((tag, index) => (
                                <tr key={index}>
                                  <td className="cell">
                                    {(currentPageDeleted - 1) * 10 + index + 1}
                                  </td>
                                  <td className="cell">
                                    <span className="truncate">
                                      #{tag.name}
                                    </span>
                                  </td>
                                  <td className="cell">
                                    <Link
                                      className="btn-sm app-btn-secondary m-2"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Restore"
                                      onClick={() => handleRestore(tag.tag_id)}
                                    >
                                      <i className="bi bi-arrow-clockwise"></i>
                                    </Link>

                                    <Link
                                      className="btn-sm app-btn-secondary m-2"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Delete"
                                      onClick={() => handleDelete(tag.tag_id)}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center">
                                  <h3>No data available</h3>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <Paginator
                    currentPage={currentPageDeleted}
                    lastPage={lastPageDeleted}
                    setCurrentPage={setCurrentPageDeleted}
                    fetchData={loadTagsDeleted}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          autoClose={1000}
          closeOnClick
          pauseOnHover
          containerId="GlobalApplicationToast"
        />
        {showRemoveModal && (
          <RemoveTagModal
            title={title}
            show={showRemoveModal}
            handleClose={() => setShowRemoveModal(false)}
            handleSoftDelete={softDeleteTagHandler}
          />
        )}
        {showConfirmModal && (
          <ConfirmModal
            title={title}
            show={showConfirmModal}
            handleClose={() => setShowConfirmModal(false)}
            handleDelete={deleteTagHandler}
          />
        )}
        {showConfirmRestoreModal && (
          <ConfirmRestoreTagModal
            title={title}
            show={showConfirmRestoreModal}
            handleClose={() => setShowConfirmRestoreModal(false)}
            handleRestore={confirmRestoreHandler}
          />
        )}
      </div>
    </div>
  );
};

export default TagsList;
