import React, { useState } from "react";
import axios from "axios";
import AdminNavBar from "./components/AdminNavBar";
import { Form, useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./TokenService";

const BASE_URL = "http://127.0.0.1:8000/api";

// interface BlogPost {
//   title: string;
//   category: string;
//   author: string;
//   connection_platform: string;
//   connect_author: string;
//   content: string;
//   images: string[];
// }

// interface JwtPayload {
//   exp: number;
// }

// interface JwtSub {
//   sub: string;
// }

// const get_token_sub = (token: string) => {
//   if (!token) return "";

//   const decoded: JwtSub = jwtDecode(token);
//   return decoded.sub;
// };
// const is_token_expired = (token: string): boolean => {
//   if (!token) return true;

//   const decoded: JwtPayload = jwtDecode(token);
//   const currentTime = Date.now() / 1000;

//   return decoded.exp < currentTime;
// };
const BlogPostForm: React.FC = () => {
  const [blogPost, setBlogPost] = useState({
    title: "",
    category: "Tutorial",
    connection_platform: "Email",
    connect_author: "",
    content: "",
    images: [],
  });

  const navigate = useNavigate();
  const handleBackToSiteMaterial = () => {
    navigate("/answer-repo/admin/dashboard/", { state: { from: "blogposts" } });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBlogPost({
      ...blogPost,
      [e.target.name]: e.target.value,
    });
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setBlogPost({
  //     ...blogPost,
  //     [e.target.name]: e.target.value as string,
  //   });
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogPost.title);
    formData.append("category", blogPost.category);
    formData.append("connection_platform", blogPost.connection_platform);
    formData.append("connect_author", blogPost.connect_author);
    formData.append("content", blogPost.content);
    blogPost.images.forEach((image: string) => {
      formData.append(`images`, image);
    });
    // let token = localStorage.getItem("access_token");
    // const dec = jwtDecode(token as string);
    // const sub = dec.sub;
    // console.log(sub);
    // if (!token) {
    //   alert("You are logged out");
    //   navigate("/answer-repo/admin/login/");
    //   return;
    // }

    // if (is_token_expired(token)) {
    //   token = localStorage.getItem("refresh_token");
    // }

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
        category: "Tutorial",
        connection_platform: "Email",
        connect_author: "",
        content: "",
        images: [],
      });
    } catch (err: any) {
      console.error("Error occured while creating blogpost", err);
      if (err.response && err.response.status === 401) {
        // console.log(`cur refresh token ->>${getRefreshToken()}`);
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
            category: "Tutorial",
            connection_platform: "Email",
            connect_author: "",
            content: "",
            images: [],
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
            name="connection_platform"
            value={blogPost.connection_platform}
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
            name="connect_author"
            value={blogPost.connect_author}
            onChange={handleChange}
            required
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
            rows={30}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Images
          </label>
          <input
            id="formFileMultiple"
            className="form-control"
            type="file"
            name="images"
            multiple
            onChange={handleChange}
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
