import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Chapter from "../interface/ChapterInterface";

const BASE_URL = "http://127.0.0.1:8000/api";

interface ChapterBreadcrumbProps {
  chapter: Chapter;
}

const ChapterBreadcrumb: React.FC<ChapterBreadcrumbProps> = ({ chapter }) => {
  const [bookTitle, setBookTitle] = useState("");

  useEffect(() => {
    const fetchBookTitle = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books/${chapter.book}`);
        setBookTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching book title:", error);
      }
    };

    fetchBookTitle();

    // Cleanup function if needed
  }, [chapter.book]); // Run effect when chapter.book changes

  return (
    <li className="breadcrumb-item">
      <Link to={`/books/${chapter.book}`}>
        {bookTitle ? bookTitle : `Book ${chapter.book}`}{" "}
        {/* Show title or fallback */}
      </Link>
    </li>
  );
};

export default ChapterBreadcrumb;
