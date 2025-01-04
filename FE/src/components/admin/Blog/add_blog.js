import React, { useEffect, useState } from "react";
import TextEditor from "../TextEditor";
import TagInput from "./Tags";
import { useNavigate } from "react-router-dom";
import { addBlog } from "../../../services/Blog";
import { fetchCategories } from "../../../services/Category";
import { fetchSports } from "../../../services/Sports";
import { fetchAll } from "../../../services/Tag";
import { getUserProfile } from "../../../services/Auth";
import { apiUrl } from "../../../config/Api";
import { uploadFileBlog } from "../../../services/Firebase";
import { Controller, useForm } from "react-hook-form";
import { convertToRaw, EditorState } from "draft-js";
import { ToastContainer, toast } from "react-toastify";
import { uniqueId } from "lodash";
import { Helmet } from "react-helmet";

const BlogAdd = () => {
  const { register, control, handleSubmit, setValue, formState } = useForm();
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [categoriesData, setCategoriesData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();

  const handleEditorChange = (editorState) => {
    setEditorContent(editorState);
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const plainText = rawContentState.blocks
      .map((block) => block.text)
      .join(" ");
    setValue("content", JSON.stringify(rawContentState));
    setValue("context", plainText);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageError("");
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Create a preview URL
    } else {
      setImageError("Blog Image avatar is required");
    }
  };

  const onSubmit = async (data) => {
    let imageUrl = await uploadFileBlog(image);
    const newBlog = {
      title: data.title,
      short_description: data.short_description,
      content: data.content,
      context: data.context,
      author_id: user?.user_id,
      category_id: data.category_id,
      tags: data.tags,
      sport_id: data.sport_id,
      image: imageUrl,
      status: "approved",
    };

    console.log(newBlog);


    try {
      await addBlog(apiUrl, newBlog);
      toast.success(`Success: Create Blog successfully.`, {
        toastId: uniqueId("toast-sucess"),
        containerId: "GlobalApplicationToast",
      });
      setTimeout(() => {
        navigate("/admin/blogs/list");
      }, 3000);
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Failed to Create Blog.");
    }
  };

  const handleHTMLChange = (html) => {
    setHtmlContent(html);
  };

  useEffect(() => {
    fetchCategories(apiUrl, 1, setCategoriesData, setError);
    fetchSports(apiUrl, 1, setSportData, setError);
    fetchAll(apiUrl, 1, setTagsData, setError);

    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  return (
    <div className="app">
      <Helmet>
        <title>Create Blog</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <h1 className="app-page-title">Create Blog</h1>
              <hr className="mb-4" />
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-12">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form
                        className="settings-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="row">
                          {/* Blog Name and Short Description */}
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="post-title" className="form-label">
                                Blog Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="title"
                                {...register("title", {
                                  required: {
                                    value: true,
                                    message: "Blog Name is required",
                                  },
                                  minLength: {
                                    value: 5,
                                    message: "Blog Name must be at least 5 characters",
                                  },
                                })}
                              />
                              {formState.errors?.title && (
                                <p className="text-danger">{formState.errors?.title.message}</p>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="short_description" className="form-label">
                                Short Description <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="short_description"
                                {...register("short_description", {
                                  required: {
                                    value: true,
                                    message: "Short Description is required",
                                  },
                                  minLength: {
                                    value: 10,
                                    message: "Short Description must be at least 10 characters",
                                  },
                                })}
                              />
                              {formState.errors?.short_description && (
                                <p className="text-danger">
                                  {formState.errors?.short_description.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="post-image" className="form-label">
                            Blog Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="image"
                            onChange={handleImageChange}
                            aria-label="Choose a file"
                          />

                          {imageUrl && (
                            <div className="mt-3">
                              <img
                                src={imageUrl}
                                alt="Preview"
                                style={{ width: "100%", maxWidth: "200px" }}
                              />
                            </div>
                          )}
                          {imageError && (
                            <p className="text-danger">{imageError}</p>
                          )}
                        </div>
                        <div className="row">

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="category_id" className="form-label">
                                Category <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-control p-2"
                                id="category_id"
                                {...register("category_id", {
                                  required: {
                                    value: true,
                                    message: "Category is required",
                                  },
                                })}
                              >
                                <option value="">Please select a category</option>
                                {categoriesData
                                  .filter((cate) => !cate.is_delete)
                                  .map((cate) => (
                                    <option key={cate.category_id} value={cate.category_id}>
                                      {cate.name}
                                    </option>
                                  ))}
                              </select>
                              {formState.errors?.category_id && (
                                <p className="text-danger">{formState.errors?.category_id.message}</p>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="sport_id" className="form-label">
                                Sport <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-control p-2"
                                id="sport_id"
                                {...register("sport_id", {
                                  required: {
                                    value: true,
                                    message: "Sport is required",
                                  },
                                })}
                              >
                                <option value="">Please select a sport</option>
                                {sportData.map((sport) => (
                                  <option key={sport.sport_id} value={sport.sport_id}>
                                    {sport.name}
                                  </option>
                                ))}
                              </select>
                              {formState.errors?.sport_id && (
                                <p className="text-danger">{formState.errors?.sport_id.message}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="tags" className="form-label">
                            Tags <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="tags"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                              <TagInput
                                value={field.value}
                                onChange={field.onChange}
                                tagsList={tagsData}
                              />
                            )}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="post-content" className="form-label">
                            Content <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="content"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextEditor
                                editorState={editorContent}
                                onChange={handleEditorChange}
                                onHTMLChange={handleHTMLChange}
                              />
                            )}
                          />
                          {formState.errors?.content && (
                            <p className="text-danger">
                              {formState.errors?.content.message}
                            </p>
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
      </div>
      <ToastContainer
        autoClose={1000}
        closeOnClick
        pauseOnHover
        containerId="GlobalApplicationToast"
      />
    </div>
  );
};

export default BlogAdd;
