import { useState, useEffect } from "react";
import axios from "axios";
import BlogPost from "../interface/BlogPostInterface";
import FetchError, { fetchErrorMessage } from "../interface/FetchError";

const BASE_URL = "http://127.0.0.1:8000/api";

const useFetchBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<FetchError>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postResponse = await axios.get(`${BASE_URL}/blogposts`);
        setPosts(postResponse.data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(`${fetchErrorMessage("", "blog posts")}: ${err}`);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, error, isLoading };
};

export default useFetchBlogPosts;
