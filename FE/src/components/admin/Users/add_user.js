import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  checkEmailExists,
  checkUsernameExists,
  checkPhoneExists,
  checkCccdExists,
} from "../../../services/Users";
import { apiUrl } from "../../../config/Api";
import { uploadFileUser } from "../../../services/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const UserAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({}); // State lưu trữ lỗi kiểm tra

  const validateField = async (field, value, checkExists) => {
    if (value) {
      const exists = await checkExists(apiUrl, value);
      if (exists) {
        setError(field, {
          type: "manual",
          message: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } already exists!`,
        });
      } else {
        clearErrors(field);
      }
    }
  };

  const email = watch("email");
  const username = watch("username");
  const phone = watch("phone");
  const cccd = watch("cccd");

  useEffect(() => {
    validateField("email", email, checkEmailExists);
  }, [email]);

  useEffect(() => {
    validateField("username", username, checkUsernameExists);
  }, [username]);

  useEffect(() => {
    validateField("phone", phone, checkPhoneExists);
  }, [phone]);

  useEffect(() => {
    validateField("cccd", cccd, checkCccdExists);
  }, [cccd]);

  const onSubmit = async (data) => {
    try {
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "string") {
          data[key] = data[key].trim();
        }
      });

      const imageUrl = await uploadFileUser(imageFile);
      const newUser = {
        username: data.username,
        email: data.email,
        password: data.password,
        full_name: data.full_name || "",
        image_user: imageUrl || "0",
        phone: data.phone || "",
        address: data.address || "",
        cccd: data.cccd || "",
        bio: data.bio || "",
        role: data.role || "user",
        is_delete: 0,
        status: data.status || "Inactive",
      };

      await addUser(apiUrl, newUser);
      toast.success("User added successfully!", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/admin/users/list");
      }, 1000);
    } catch (error) {
      toast.error(error.message || "An error occurred while adding the user!");
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>Create User</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <h1 className="app-page-title">Add User</h1>
              <hr className="mb-4" />
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-12">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form
                        className="settings-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="username" className="form-label">
                              Username <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.username || fieldErrors.username
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="username"
                              {...register("username", {
                                required: "Username is required",
                                minLength: {
                                  value: 5,
                                  message:
                                    "Username must be at least 5 characters",
                                },
                                validate: (value) =>
                                  !/\s/.test(value) ||
                                  "Username must not contain spaces",
                              })}
                            />
                            {(errors.username || fieldErrors.username) && (
                              <div className="invalid-feedback">
                                {errors.username
                                  ? errors.username.message
                                  : fieldErrors.username}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className={`form-control ${
                                errors.email || fieldErrors.email
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                            {(errors.email || fieldErrors.email) && (
                              <div className="invalid-feedback">
                                {errors.email
                                  ? errors.email.message
                                  : fieldErrors.email}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="password" className="form-label">
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              id="password"
                              {...register("password", {
                                required: "Password is required",
                                minLength: {
                                  value: 6,
                                  message:
                                    "Password must be at least 6 characters",
                                },
                              })}
                            />
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password.message}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="full_name" className="form-label">
                              Full Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.full_name ? "is-invalid" : ""
                              }`}
                              id="full_name"
                              {...register("full_name", {
                                required: "Full Name is required",
                                minLength: {
                                  value: 3,
                                  message:
                                    "Full Name must be at least 3 characters",
                                },
                              })}
                            />
                            {errors.full_name && (
                              <div className="invalid-feedback">
                                {errors.full_name.message}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="image_user" className="form-label">
                              Profile Image{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="file"
                              className={`form-control ${
                                errors.image_user ? "is-invalid" : ""
                              }`}
                              id="image_user"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            {errors.image_user && (
                              <div className="invalid-feedback">
                                {errors.image_user.message}
                              </div>
                            )}
                          </div>
                          {imagePreview && (
                            <div className="col-md-6">
                              <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="img-fluid"
                              />
                            </div>
                          )}
                          <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.phone || fieldErrors.phone
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="phone"
                              {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[0-9]{10,12}$/,
                                  message:
                                    "Phone number must be between 10 and 12 digits",
                                },
                              })}
                            />
                            {(errors.phone || fieldErrors.phone) && (
                              <div className="invalid-feedback">
                                {errors.phone
                                  ? errors.phone.message
                                  : fieldErrors.phone}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="address" className="form-label">
                              Address <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.address ? "is-invalid" : ""
                              }`}
                              id="address"
                              {...register("address", {
                                required: "Address is required",
                              })}
                            />
                            {errors.address && (
                              <div className="invalid-feedback">
                                {errors.address.message}
                              </div>
                            )}
                          </div>
                         

                          <div className="col-md-6">
                            <label htmlFor="role" className="form-label">
                              Role <span className="text-danger">*</span>
                            </label>
                            <select
                              className={`form-control ${
                                errors.role ? "is-invalid" : ""
                              }`}
                              id="role"
                              {...register("role", {
                                required: "Role is required",
                              })}
                            >
                              <option value="">Please select a role</option>
                              <option value="admin">Admin</option>
                              <option value="author">Author</option>
                              <option value="user">User</option>
                            </select>
                            {errors.role && (
                              <div className="invalid-feedback">
                                {errors.role.message}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="status" className="form-label">
                              Status <span className="text-danger">*</span>
                            </label>
                            <select
                              className={`form-control ${
                                errors.status ? "is-invalid" : ""
                              }`}
                              id="status"
                              {...register("status", {
                                required: "Status is required",
                              })}
                            >
                              <option value="">Please select a status</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                            {errors.status && (
                              <div className="invalid-feedback">
                                {errors.status.message}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="bio" className="form-label">
                              Bio
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.bio ? "is-invalid" : ""
                              }`}
                              id="bio"
                              {...register("bio", {
                                maxLength: {
                                  value: 500,
                                  message: "Bio cannot exceed 500 characters",
                                },
                              })}
                            />
                            {errors.bio && (
                              <div className="invalid-feedback">
                                {errors.bio.message}
                              </div>
                            )}
                          </div>
                          <div className="d-flex mt-3">
                            <button
                              type="submit"
                              className="btn app-btn-primary"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              className="btn app-btn-secondary ms-2"
                              onClick={() => navigate(-1)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserAdd;
