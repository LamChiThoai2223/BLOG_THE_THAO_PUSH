import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../services/Category";
import { fetchAllCategories } from "../../../services/Category";
import { apiUrl } from "../../../config/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchAllCategories(apiUrl, setCategories, setError);
        console.log("Fetched Categories:", fetchedCategories);
      } catch (error) {
        toast.error("Failed to load categories.");
        console.error(error);
      }
    };
    getCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      const newCategory = {
        name: data.name,
        description: data.description,
        is_delete: 0,
        parent_id: data.parent_id || null, 
      };
      await addCategory(apiUrl, newCategory);
      toast.success("The category has been added successfully!");
      navigate("/admin/category/list");
    } catch (error) {
      toast.error("An error occurred while adding a category!");
      console.error(error);
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>Create Category</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <h1 className="app-page-title">Add Category</h1>
              <hr className="mb-4" />
              {error && <p className="text-danger">{error}</p>}
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-12">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form
                        className="settings-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Category Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            {...register("name", {
                              required: "Category name is required",
                              pattern: {
                                value: /^[a-zA-Z0-9\s]+$/,
                                message:
                                  "Category name cannot contain special characters",
                              },
                            })}
                          />
                          {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control h-100"
                            id="description"
                            {...register("description", {
                              required: "Description is required",
                            })}
                            rows="3"
                          />
                          {errors.description && (
                            <p className="text-danger">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="parent_id" className="form-label">
                            Parent Category
                          </label>
                          <select
                            id="parent_id"
                            className="form-select"
                            {...register("parent_id")}
                          >
                            <option value="">Category</option>
                            {categories.map((category) => (
                              <option key={category.category_id} value={category.category_id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          className="btn btn-secondary ms-2"
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn app-btn-primary">
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
