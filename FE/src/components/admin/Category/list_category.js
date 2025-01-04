import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../config/Api";
import {
  fetchCategories,
  softDeleteCategory,
  restoreCategory,
  deleteCategory,
  fetchAllPaginator,
  fetchAllDeletedPaginator,
} from "../../../services/Category";
import Paginator from "../Paginator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RemoveCategoryModal,
  ConfirmModal,
  ConfirmRestoreCategoryModal,
} from "../../Dialog";
import { Helmet } from "react-helmet";

const CategoriesList = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageDeleted, setCurrentPageDeleted] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [lastPageDeleted, setLastPageDeleted] = useState(1);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmRestoreModal, setShowConfirmRestoreModal] = useState(false);
  const [categoryIdToRemove, setCategoryIdToRemove] = useState(null);
  const [categoryIdToRestore, setCategoryIdToRestore] = useState(null);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  const navigate = useNavigate();

  const loadCate = (page = 1) => {
    fetchAllPaginator(apiUrl, page, setCategoriesData, setError)
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
  };

  const loadCategorysDeleted = (page = 1) => {
    fetchAllDeletedPaginator(apiUrl, page, setCategoriesData, setError)
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
  };

  useEffect(() => {
    loadCate(currentPage);
  }, [currentPage]);

  const handleSoftDelete = (categoryId) => {
    setCategoryIdToRemove(categoryId);
    setShowRemoveModal(true);
  };

  const handleRestore = (categoryId) => {
    setCategoryIdToRestore(categoryId);
    setShowConfirmRestoreModal(true);
  };

  const handleDelete = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setShowConfirmModal(true);
  };

  const softDeleteCategoryHandler = async () => {
    try {
      await softDeleteCategory(apiUrl, categoryIdToRemove, setCategoriesData);
      toast.success("Category deleted successfully!");
      fetchCategories(
        apiUrl,
        currentPage,
        setCategoriesData,
        setError,
        setLastPage
      );
      setShowRemoveModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting category.");
    }
  };

  const confirmRestoreHandler = async () => {
    try {
      await restoreCategory(apiUrl, categoryIdToRestore, setCategoriesData);
      toast.success("Category restored successfully!");
      fetchCategories(
        apiUrl,
        currentPage,
        setCategoriesData,
        setError,
        setLastPage
      );
      setShowConfirmRestoreModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error restoring category.");
    }
  };

  const deleteCategoryHandler = async () => {
    try {
      await deleteCategory(apiUrl, categoryIdToDelete, setCategoriesData);
      toast.success("Category permanently deleted!");
      fetchCategories(
        apiUrl,
        currentPage,
        setCategoriesData,
        setError,
        setLastPage
      );
      setShowConfirmModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error permanently deleting category.");
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>List Category</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                  <h1 className="app-page-title mb-0">Categories</h1>
                </div>
                <div className="col-auto">
                  <div className="page-utilities">
                    <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                      <div className="col-auto">
                        <form className="table-search-form row gx-1 align-items-center" onSubmit={(e) => { e.preventDefault(); }}>
                          <div className="col-auto">
                            <input
                              type="text"
                              id="search-users"
                              name="searchKeyword"
                              className="form-control search-users"
                              placeholder="Search"

                            />
                          </div>
                          <div className="col-auto">
                            <button type="button" className="btn app-btn-secondary">Search</button>
                          </div>
                        </form>
                      </div>
                    </div>
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
                  onClick={() => loadCate(currentPage)}
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
                  onClick={() => loadCategorysDeleted(currentPageDeleted)}
                >
                  Deleted Categories
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
                              <th className="cell">Category Name</th>
                              <th className="cell">Description</th>
                              <th className="cell">Category</th>
                              <th className="cell"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoriesData
                              .filter((cate) => !cate.is_delete)
                              .map((cate, index) => (
                                <tr key={index}>
                                  <td className="cell">
                                    {(currentPage - 1) * 10 + index + 1}
                                  </td>
                                  <td className="cell">
                                    <span className="truncate">
                                      {cate.name}
                                    </span>
                                  </td>
                                  <td className="cell">{cate.description}</td>
                                  <td className="cell">
                                    {cate.parent_name
                                      ? `Belongs to ${cate.parent_name}`
                                      : "N/A"}
                                  </td>
                                  <td className="cell">
                                    <Link
                                      className="btn-sm app-btn-secondary m-2"
                                      to={`/admin/category/edit/${cate.category_id}`}
                                    >
                                      <i className="fa-regular fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                      className="btn-sm app-btn-secondary m-2"
                                      onClick={() =>
                                        handleSoftDelete(cate.category_id)
                                      }
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <Paginator
                    currentPage={currentPage}
                    lastPage={lastPage}
                    setCurrentPage={setCurrentPage}
                    fetchData={loadCate}
                  />
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
                              <th className="cell">Category Name</th>
                              <th className="cell">Description</th>
                              <th className="cell"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoriesData
                              .filter((cate) => cate.is_delete)
                              .map((cate, index) => (
                                <tr key={index}>
                                  <td className="cell">
                                    {(currentPageDeleted - 1) * 10 + index + 1}
                                  </td>
                                  <td className="cell">
                                    <span className="truncate">
                                      {cate.name}
                                    </span>
                                  </td>
                                  <td className="cell">{cate.description}</td>
                                  <td className="cell">
                                    <button
                                      className="btn-sm app-btn-secondary m-2"
                                      onClick={() =>
                                        handleRestore(cate.category_id)
                                      }
                                    >
                                      <i className="bi bi-arrow-clockwise"></i>
                                    </button>
                                    <button
                                      className="btn-sm app-btn-secondary m-2"
                                      onClick={() =>
                                        handleDelete(cate.category_id)
                                      }
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            {categoriesData.filter((cate) => cate.is_delete)
                              .length === 0 && (
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    No deleted categories found
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
                    fetchData={loadCategorysDeleted}
                  />
                </div>
              </div>
              <ToastContainer />
              {showRemoveModal && (
                <RemoveCategoryModal
                  show={showRemoveModal}
                  handleClose={() => setShowRemoveModal(false)}
                  handleSoftDelete={softDeleteCategoryHandler}
                />
              )}
              {showConfirmModal && (
                <ConfirmModal
                  show={showConfirmModal}
                  handleClose={() => setShowConfirmModal(false)}
                  handleDelete={deleteCategoryHandler}
                />
              )}
              {showConfirmRestoreModal && (
                <ConfirmRestoreCategoryModal
                  show={showConfirmRestoreModal}
                  handleClose={() => setShowConfirmRestoreModal(false)}
                  handleRestore={confirmRestoreHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
