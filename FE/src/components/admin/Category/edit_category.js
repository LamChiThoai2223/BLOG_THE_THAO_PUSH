import React, { useEffect, useState } from "react"; 
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCategoryById, updateCategory } from "../../../services/Category";
import { fetchAllCategories } from "../../../services/Category";
import { apiUrl } from "../../../config/Api";
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet";

const EditCategory = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentParentId, setCurrentParentId] = useState(null); // State to store the current parent ID
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await fetchCategoryById(id);
        console.log("Response from fetchCategoryById:", response);  // Log toàn bộ response
  
        if (response && response.data) {
          // Kiểm tra nếu response.data có phải là mảng không
          if (Array.isArray(response.data)) {
            const data = response.data[0]; // Lấy phần tử đầu tiên nếu data là mảng
            setValue("name", data.name);
            setValue("description", data.description);
            setCurrentParentId(data.parent_id);
          } else {
            console.error("Error: response.data is not an array", response.data);
            setError("Failed to fetch category data: Invalid structure");
          }
        } else {
          throw new Error("Invalid data returned");
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch category data", error);
        setError("Failed to fetch category data");
        setLoading(false);
      }
    };
  
    getCategoryData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const updatedCategory = {
      name: data.name,
      description: data.description,
      parent_id: data.parent_id, // Include parent_id in the updated data
    };

    try {
      await updateCategory(id, updatedCategory);
      toast.success('Category has been updated successfully!');
      navigate("/admin/category/list");
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the category!');
    }
  };

  if (loading) return <p>Loading...</p>; // Display loading when data is being fetched
  if (error) return <p>{error}</p>; // Display error if there is one

  return (
    <div className="app">
      <Helmet>
        <title>Edit Category</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <h1 className="app-page-title">Update Category</h1>
              <hr className="mb-4" />
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
                            Category Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            {...register("name", {
                              required: "Category name cannot be empty",
                              pattern: {
                                value: /^[a-zA-Z0-9\s]+$/,
                                message:
                                  "Category names cannot contain special characters",
                              },
                            })}
                          />
                          {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="description"
                            className="form-label"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control h-100"
                            id="description"
                            {...register("description", {
                              required: "Description cannot be empty",
                            })}
                            rows="3"
                          />
                          {errors.description && (
                            <p className="text-danger">
                              {errors.description.message}
                            </p>
                          )}
                        </div>

                        {/* Dropdown for Parent Category */}
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
                          type='button'
                          className='btn btn-secondary ms-2'
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn app-btn-primary">
                          Update
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
    </div>
  );
};

export default EditCategory;
