//TODO: add fetch errors and loading

import { useEffect, useState } from "react";
import BlogPost from "../interface/BlogPostInterface";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/api";

function BlogPostList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postResponse = await axios.get(`${BASE_URL}/blogposts`);
      setPosts(postResponse.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <Link
          className="card grid-item"
          key={post.id}
          to={`blogposts/${post.id}`}
        >
          <img id="cover-img" src={post.cover_image} alt="cover image" />
          <div className="bp-cover-title-container">
            <p>{post.title}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default BlogPostList;
