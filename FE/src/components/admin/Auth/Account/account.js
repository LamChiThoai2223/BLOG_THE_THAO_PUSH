import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { apiUrl } from "../../../../config/Api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  getUserProfile,
  logout,
  updateProfile,
} from "../../../../services/Auth";
import {
  fetchDataFromDatabase,
  uploadFileBlog,
  uploadFileUser,
} from "../../../../services/Firebase";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Account = () => {
  const { register, setValue, formState, handleSubmit } = useForm();
  const [user, setUser] = useState({});
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (file) {
      try {
        const uploadedUrl = await uploadFileUser(file);
        setUrl(uploadedUrl);
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }
  };
  const submit = async (value) => {
    const profile = {
      full_name: value.full_name,
      email: value.email,
      phone: value.phone,
      bio: value.bio,
      address: value.address,
      image_user: value?.image[0]?.name,
    };
    handleUpload();
    try {
      const data = await getUserProfile(Cookies.get("token"));
      await updateProfile(data.user_id, profile);
      toast.success("Updated user successfully!", { autoClose: 1000 });
      setTimeout(() => {
        fetchUser();
      }, 1000);
    } catch (err) {
      toast.error("Updated user errors!", { autoClose: 1000 });
    }
  };

  const fetchUser = async () => {
    try {
      const data = await getUserProfile(Cookies.get("token"));
      setUser(data);
      if (data) {
        setValue("full_name", data.full_name);
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("address", data.address);
        setValue("bio", data.bio);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      fetchUser();
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await logout(token); // Gửi token khi logout
      }
      Cookies.remove("token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("token", { path: "/admin" });
      Cookies.remove("role", { path: "/admin" });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>Profile Admin</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <section>
          <div className="container py-5 card">
            <div className="card-body">
              <div className="row g-3 mb-5 align-items-center justify-content-between">
                <div className="col-auto">
                  <h1 className="app-page-title mb-0">Account Information</h1>
                </div>
              </div>
              <form
                action=""
                method="POST"
                encType="multipart/form-data"
                id="update_acount"
                onSubmit={handleSubmit(submit)}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <img
                          alt="avatar"
                          src={user.image_user}
                          className="rounded-circle img-fluid"
                          style={{ width: "150px" }}
                        />
                        <h5 className="my-3">{user ? user.name : ""}</h5>
                      </div>
                    </div>
                    <div className="card mb-4 mb-lg-0">
                      <div className="card-body p-0">
                        <ul className="list-group list-group-flush rounded-3">
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <a href="" className="text-dark">
                              <p onClick={handleLogout} className="mb-0">
                                Log Out
                              </p>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <h2>Change Profile</h2>
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">
                              Fullname<span className="text-danger">*</span>
                            </p>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name="full_name"
                              className="form-control"
                              {...register("full_name", {
                                required: {
                                  value: true,
                                  message: "Full name cannot be blank",
                                },
                              })}
                            />
                            {formState?.errors?.full_name && (
                              <small className="text-danger">
                                {formState?.errors?.full_name?.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">
                              Email<span className="text-danger">*</span>
                            </p>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              {...register("email", {
                                required: {
                                  value: true,
                                  message: "Email cannot be blank",
                                },
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Please enter a valid email address",
                                },
                              })}
                            />
                            {formState?.errors?.email && (
                              <small className="text-danger">
                                {formState?.errors?.email?.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">
                              Phone<span className="text-danger">*</span>
                            </p>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name="phone"
                              className="form-control"
                              {...register("phone", {
                                required: {
                                  value: true,
                                  message: "Phone cannot be blank",
                                },
                                pattern: {
                                  value: /^0[0-9]{8,11}$/,
                                  message:
                                    "Please enter a valid phone number starting with 0 (9-12 digits)",
                                },
                              })}
                            />
                            {formState?.errors?.phone && (
                              <small className="text-danger">
                                {formState?.errors?.phone?.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Bio</p>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name="bio"
                              className="form-control"
                              {...register("bio")}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">
                              Address<span className="text-danger">*</span>
                            </p>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              {...register("address", {
                                required: {
                                  value: true,
                                  message: "Address cannot be blank",
                                },
                              })}
                            />
                            {formState?.errors?.address && (
                              <small className="text-danger">
                                {formState?.errors?.address?.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Image</p>
                          </div>
                          <div className="col-sm-9">
                            <input
                              type="file"
                              name="up_hinh"
                              {...register("image", {})}
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                        <hr />
                        <button
                          type="submit"
                          name="btn_confirm"
                          className="btn btn-outline-primary float-end mr-3"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Account;
