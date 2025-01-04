import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchUserDetails,
  updateUser,
  checkEmailExists,
  checkPhoneExists,
  checkCccdExists,
} from "../../../services/Users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFileUser } from "../../../services/Firebase";
import { apiUrl } from "../../../config/Api"; // Thêm import apiUrl
import { Helmet } from "react-helmet";

const UserEdit = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetchUserDetails(id);
        if (response && response.data) {
          const data = response.data;
          setUserDetails(data);
          setValue("username", data.username);
          setValue("email", data.email);
          setValue("full_name", data.full_name || "");
          setValue("image_user", data.image_user || "");
          setValue("phone", data.phone || "");
          setValue("address", data.address || "");
          setValue("cccd", data.cccd || "");
          setValue("bio", data.bio || "");
          setValue("role", data.role || "user");
          setValue("status", data.status || "Inactive");

          if (data.image_user) {
            setImagePreview(data.image_user);
          }
        } else {
          throw new Error("Invalid response data");
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to fetch user details");
        setLoading(false);
      }
    };

    getUserDetails();
  }, [id, setValue]);

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
      setImagePreview("");
    }
  };

  const validateUniqueFields = async (data) => {
    const errors = {};

    const emailExists = await checkEmailExists(apiUrl, data.email); // Thêm apiUrl vào đây
    if (emailExists && data.email !== userDetails.email) {
      errors.email = "Email already exists!";
    }

    const phoneExists = await checkPhoneExists(apiUrl, data.phone); // Thêm apiUrl vào đây
    if (phoneExists && data.phone !== userDetails.phone) {
      errors.phone = "Phone already exists!";
    }

    const cccdExists = await checkCccdExists(apiUrl, data.cccd); // Thêm apiUrl vào đây
    if (cccdExists && data.cccd !== userDetails.cccd) {
      errors.cccd = "CCCD already exists!";
    }

    return errors;
  };

  const onSubmit = async (data) => {
    try {
      const uniqueFieldErrors = await validateUniqueFields(data);
      if (Object.keys(uniqueFieldErrors).length > 0) {
        setFieldErrors(uniqueFieldErrors);
        return;
      }

      setFieldErrors({}); // Reset lỗi nếu không có lỗi

      const updatedUser = {
        email: data.email,
        full_name: data.full_name || "",
        image_user: imageFile
          ? await uploadFileUser(imageFile)
          : data.image_user,
        phone: data.phone || "",
        address: data.address || "",
        cccd: data.cccd || "",
        bio: data.bio || "",
        role: data.role || "user",
        status: data.status || "Inactive",
      };

      await updateUser(id, updatedUser);
      toast.success("User updated successfully!", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/admin/users/list");
      }, 1000);
    } catch (error) {
      toast.error("An error occurred while updating the user!", {
        autoClose: 1000,
      });
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app">
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <h1 className="app-page-title">Update User</h1>
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
                          {/* <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">
                                                        Username <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.username || fieldErrors.username ? 'is-invalid' : ''}`}
                                                        id="username"
                                                        {...register("username", {
                                                            required: "Username is required",
                                                            minLength: {
                                                                value: 5,
                                                                message: "Username must be at least 5 characters"
                                                            }
                                                        })}
                                                        disabled
                                                    />
                                                    {(errors.username || fieldErrors.username) && <div className="invalid-feedback">{errors.username ? errors.username.message : fieldErrors.username}</div>}
                                                </div> */}
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
                              Profile Image
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
                                style={{ width: "300px" }}
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
                            <label htmlFor="cccd" className="form-label">
                              Citizen ID (CCCD){" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.cccd || fieldErrors.cccd
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="cccd"
                              {...register("cccd", {
                                required: "CCCD is required",
                                pattern: {
                                  value: /^[0-9]{12}$/,
                                  message: "CCCD must be exactly 12 digits",
                                },
                              })}
                            />
                            {(errors.cccd || fieldErrors.cccd) && (
                              <div className="invalid-feedback">
                                {errors.cccd
                                  ? errors.cccd.message
                                  : fieldErrors.cccd}
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
                              Update
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

export default UserEdit;
