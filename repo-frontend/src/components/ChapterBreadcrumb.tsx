import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Chapter from "../interface/ChapterInterface";
import { fetchErrorMessage } from "../interface/FetchError";

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
      } catch (err) {
        console.error(
          `${fetchErrorMessage(chapter.book.toString(), "book")}: ${err}`
        );
      }
    };

    fetchBookTitle();
  }, [chapter.book]); // Run effect when chapter.book changes

  return (
    <>
      <li id="bc-book-title" className="breadcrumb-item">
        <Link
          className="inactive-anchor-link"
          id="bc-book-title-link"
          to={`/books/${chapter.book}`}
        >
          {bookTitle ? bookTitle : `Book ${chapter.book}`}
        </Link>

        <span className="greater-than">&#x02AA2;</span>
      </li>
      <li id="bc-active" className="breadcrumb-item active">
        {chapter.title}
      </li>
    </>
  );
};

export default ChapterBreadcrumb;
