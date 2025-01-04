import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchById, putById } from "../../../services/Tag";
import { useNavigate, useParams } from "react-router-dom";
import SuccessNotification from "../SuccessNotification/SuccessNotification";
import { apiUrl } from "../../../config/Api";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { Modal, Button } from "react-bootstrap"; // Assuming you are using react-bootstrap
import { ConfirmEdit } from "../../Dialog";  // Import the custom ConfirmEdit component


const EditTag = () => {
  const { register, setValue, formState, reset, handleSubmit, getValues } =
    useForm();
  const { tagId } = useParams();
  const tagIdStr = String(tagId);
  const navigate = useNavigate();
  const [tag, setTag] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [notification, setNotification] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState(null); // State to store form data for confirmation

  useEffect(() => {
    console.log("Extracted tagId:", tagId);
    if (tagId) {
      fetchById(apiUrl, tagId, setTag, setError);
    }
  }, [tagId]);

  useEffect(() => {
    if (tag) {
      console.log(tag);
      setValue("name", tag[0].name);
    }
  }, [tag, setValue]);

  // Show confirmation modal instead of using window.confirm
  const handleFormSubmit = (data) => {
    setFormData(data); // Store the form data
    setShowModal(true); // Open the modal
  };

  const handleConfirmEdit = async () => {
    setShowModal(false); // Close the modal
    putById(apiUrl, tagId, formData, setResponse, setError)
      .then(() => {
        toast.success("Tag edited successfully!", { autoClose: 1000 });
        setTimeout(() => {
          navigate("/admin/tags");
        }, 1500);
      })
      .catch((err) => {
        toast.error("Tag edit error!", { autoClose: 1000 });
        console.error("Error editing tag:", err);
        setError("submission", {
          type: "manual",
          message: "Error editing tag",
        });
      });
  };

  return (
    <div className="app">
      <Helmet>
        <title>Edit Tag</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <h1 className="app-page-title">Edit Tag</h1>
            <hr className="mb-4" />
            <div className="row g-4 settings-section">
              <div className="col-12 col-md-12">
                <div className="app-card app-card-settings shadow-sm p-4">
                  <div className="app-card-body">
                    <form
                      className="settings-form"
                      onSubmit={handleSubmit(handleFormSubmit)} // Use custom submit handler
                    >
                      <div className="mb-3">
                        <label htmlFor="post-title" className="form-label">
                          Name tag
                          <span
                            className="ms-2"
                            data-bs-container="body"
                            data-bs-toggle="popover"
                            data-bs-trigger="hover focus"
                            data-bs-placement="top"
                            data-bs-content="Nhập tên bài viết."
                          >
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-info-circle"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                              />
                              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                              <circle cx="8" cy="4.5" r="1" />
                            </svg>
                          </span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="post-title"
                          placeholder="Name"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "Card name cannot be blank",
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9]+$/,
                              message:
                                "Name cannot contain spaces or special characters",
                            },
                          })}
                        />
                        {formState?.errors?.name && (
                          <small className="text-danger">
                            {formState?.errors?.name?.message}
                          </small>
                        )}
                      </div>
                      <button type="submit" className="btn app-btn-primary">
                        Submit
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

      {/* Confirmation Modal */}
      <ConfirmEdit
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleRestore={handleConfirmEdit}
        title="Tag"
      />
    </div>
  );
};

export default EditTag;
