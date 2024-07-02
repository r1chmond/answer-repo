import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import AdminNavBar from "./components/AdminNavBar";
import { Form, useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./TokenService";

const BASE_URL = "http://127.0.0.1:8000/api";

const BlogPostForm: React.FC = () => {
  const [blogPost, setBlogPost] = useState({
    title: "",
    cover_image: null as File | null,
    category: "Tutorial",
    social_platform: "Email",
    social_username: "",
    content: "",
    uploaded_images: [] as File[],
  });

  const navigate = useNavigate();
  const handleBackToSiteMaterial = () => {
    navigate("/answer-repo/admin/dashboard/", { state: { from: "blogposts" } });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setBlogPost((prevBlogPost) => ({
        ...prevBlogPost,
        cover_image: file,
      }));
    }
  };

  const handleMultiImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // Convert FileList to Array
      setBlogPost((prevBlogPost) => ({
        ...prevBlogPost,
        uploaded_images: filesArray, // Update state with the array of files
      }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setBlogPost({
      ...blogPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogPost.title);
    if (blogPost.cover_image) {
      formData.append(
        "cover_image",
        blogPost.cover_image,
        blogPost.cover_image.name
      );
    }
    formData.append("category", blogPost.category);
    formData.append("social_platform", blogPost.social_platform);
    formData.append("social_username", blogPost.social_username);
    formData.append("content", blogPost.content);
    for (let i = 0; i < blogPost.uploaded_images.length; i++) {
      console.log(
        `===>>> Appending uploaded_image ${i}:`,
        blogPost.uploaded_images[i]
      );
      formData.append("uploaded_images", blogPost.uploaded_images[i]);
    }
    for (const key of formData.keys()) {
      console.log(`${key} ==>> ${formData.get(key)}`);
    }
    try {
      await axios.post(`${BASE_URL}/blogposts/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${getAccessToken()}`,
        },
      });
      alert("Post created successfully");
      setBlogPost({
        title: "",
        cover_image: null,
        category: "Tutorial",
        social_platform: "Email",
        social_username: "",
        content: "",
        uploaded_images: [],
      });
    } catch (err: any) {
      console.error("Error occured while creating blogpost", err);
      if (err.response && err.response.status === 401) {
        try {
          const res = await axios.post(
            `${BASE_URL}/token/refresh/`,
            { refresh: getRefreshToken() },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setAccessToken(res.data.access);
          await axios.post(`${BASE_URL}/blogposts/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `JWT ${getAccessToken()}`,
            },
          });
          alert("post successfull created");
          setBlogPost({
            title: "",
            cover_image: null,
            category: "Tutorial",
            social_platform: "Email",
            social_username: "",
            content: "",
            uploaded_images: [],
          });
        } catch {
          console.log("unable to generate new access token");
        }
      }
    }
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <AdminNavBar />
      </nav>
      <nav id="bc-nav" aria-label="breadcrumb">
        <ol id="bc-ol" className="breadcrumb">
          <li id="bc-books" className="breadcrumb-item">
            <button
              className="inactive-anchor-link"
              onClick={handleBackToSiteMaterial}
            >
              Site Materials
            </button>{" "}
            <span className="greater-than">&#x02AA2;</span>
          </li>
          <li className="breadcrumb-item inactive-anchor-link">
            Blogposts <span className="greater-than">&#x02AA2;</span>
          </li>
          <li id="bc-active" className="breadcrumb-item active">
            create Blogpost
          </li>
        </ol>
      </nav>
      <Form method="post" className="mb-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"> Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={blogPost.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Cover Image
          </label>
          <input
            id="formFile"
            className="form-control"
            type="file"
            name="cover_image"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category </label>
          <select
            className="form-select"
            name="category"
            value={blogPost.category}
            onChange={handleChange}
            required
          >
            <option value="Tutorial">Tutorial</option>
            <option value="News and Updates">News and Updates</option>
            <option value="Tips and Tricks">Tips and Tricks</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Social Plaform</label>
          <select
            className="form-select"
            name="social_platform"
            value={blogPost.social_platform}
            onChange={handleChange}
            required
          >
            <option value="Email">Email</option>
            <option value="Website">Website</option>
            <option value="Twitter(x)">Twitter (X)</option>
            <option value="Instagram">Instagram</option>
            <option value="Github">Github</option>
            <option value="Linkedin">LinkedIn</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Social UserID</label>
          <input
            className="form-control"
            type="text"
            name="social_username"
            value={blogPost.social_username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Content Images
          </label>
          <input
            id="formFileMultiple"
            className="form-control"
            type="file"
            name="uploaded_images"
            multiple
            onChange={handleMultiImageChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            name="content"
            value={blogPost.content}
            onChange={handleChange}
            required
            rows={28}
          />
        </div>

        <button
          id="create-post-btn"
          className="btn error-page-btn"
          type="submit"
        >
          Create Post
        </button>
      </Form>
    </>
  );
};

export default BlogPostForm;
