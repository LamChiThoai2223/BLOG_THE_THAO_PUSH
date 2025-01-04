import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { add, checkNameTag } from "../../../services/Tag";
import SuccessNotification from "../SuccessNotification/SuccessNotification";
import { apiUrl } from "../../../config/Api";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

const AddTag = () => {
  const {
    register,
    setValue,
    setError,
    formState,
    reset,
    handleSubmit,
    getValues,
    clearErrors,
  } = useForm();
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const checkName = await checkNameTag(apiUrl, data.name);
      if (checkName) {
        setError("name", {
          type: "manual",
          message: "Name tag is already taken",
        });
        return;
      }
      const setPostData = (data) => {
        console.log("Data received:", data);
        reset();
      };
      await add(apiUrl, setPostData, setError, data);
      toast.success("Tag added successfully!", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/admin/tags");
      }, 1500);
    } catch (error) {
      toast.error(`Tag adding error: ${error}`, { autoClose: 1000 });
      console.error("Error adding tag:", error);
      setError("submission", { type: "manual", message: "Error adding tag" });
    }
  };

  const handleUsernameBlur = async () => {
    const name = getValues("name");
    if (name) {
      const checkName = await checkNameTag(apiUrl, name);
      if (checkName) {
        setError("name", {
          type: "manual",
          message: "Name tag is already taken",
        });
      } else {
        clearErrors("name");
      }
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>Create Tag</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-4 settings-section">
              <div className="col-12 col-md-12">
                <div className="app-card app-card-settings shadow-sm p-4">
                  <div className="app-card-body">
                    <span className="profile-info-author-title me-3">
                      Add Tag
                    </span>
                    <hr className="mb-3" />
                    <form
                      className="settings-form"
                      onSubmit={handleSubmit(submit)}
                    >
                      <div className="mb-3">
                        <label htmlFor="post-title" className="form-label mb-3">
                          Name tag
                        </label>{" "}
                        <span className="text-danger fs-5">*</span>
                        <input
                          type="text"
                          className="form-control"
                          id="post-title"
                          placeholder="Name"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "Name tag cannot be blank",
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9]+$/,
                              message:
                                "Name cannot contain spaces or special characters",
                            },
                          })}
                          onBlur={handleUsernameBlur}
                        />
                        {formState?.errors?.name && (
                          <small className="text-danger">
                            {formState?.errors?.name?.message}
                          </small>
                        )}
                      </div>
                      <button
                        type="button"
                        className="btn buttonColorGayItem"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn buttonColorGreenItem"
                      >
                        Add Articles
                      </button>
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
  );
};

export default AddTag;
