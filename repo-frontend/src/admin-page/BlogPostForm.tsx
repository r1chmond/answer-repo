import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

interface BlogPost {
  title: string;
  category: string;
  author: string;
  connection_platform: string;
  connect_author: string;
  content: string;
  images: File[];
}
const BlogPostForm: React.FC = () => {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    category: "tutorial",
    author: "",
    connection_platform: "email",
    connect_author: "",
    content: "",
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBlogPost({ ...blogPost, images: Array.from(e.target.files) });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogPost.title);
    formData.append("category", blogPost.category);
    formData.append("author", blogPost.author);
    formData.append("connection_platform", blogPost.connection_platform);
    formData.append("connent_author", blogPost.connect_author);
    formData.append("content", blogPost.content);
    blogPost.images.forEach((image, index) => {
      formData.append(`images[${index}].image`, image);
    });

    try {
      await axios.post(
        `${BASE_URL}/blogposts/`,
        { formData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Post created successfully");
    } catch (err) {
      console.error("Error occured while creating blogpost", err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Title</label>
          <input
            type="text"
            name="title"
            value={blogPost.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category </label>
          <select
            name="category"
            value={blogPost.category}
            onChange={handleChange}
            required
          >
            <option value="tutorial">Tutorial</option>
            <option value="news and update">News and Updates</option>
            <option value="tips and tricks">Tips and Tricks</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Social Plaform</label>
          <select
            name="connection_platform"
            value={blogPost.connection_platform}
            onChange={handleChange}
            required
          >
            <option value="email">Email</option>
            <option value="website">Website</option>
            <option value="twitter(x)">Twitter (X)</option>
            <option value="instagram">Instagram</option>
            <option value="github">Github</option>
            <option value="linkedin">LinkedIn</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Social ID</label>
          <input
            type="text"
            name="connect_author"
            value={blogPost.connect_author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={blogPost.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Creat Post</button>
      </form>
    </>
  );
};

export default BlogPostForm;
