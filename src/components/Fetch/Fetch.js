import axios from "axios";
import React, { useState } from "react";
import "./Fetch.css";
import {
  FaSpinner,
  FaBookReader,
  FaBook,
  FaMapMarkerAlt,
  FaCalendarCheck,
} from "react-icons/fa";

const Fetch = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        "https://www.anapioficeandfire.com/api/books?pageSize=30"
      );

      setBooks(response.data);
      response.data.sort(function compare(a, b) {
        return new Date(b.released) - new Date(a.released);
      });
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const sortArray = (sortingType) => {
    if (sortingType === "asc") {
      let sorted = [...books].sort((a, b) => {
        if (new Date(a.released).getTime() > new Date(b.released).getTime())
          return 1;
        else return -1;
      });

      setBooks(sorted);
    }
    if (sortingType === "dsc") {
      let sorted = [...books].sort((a, b) => {
        if (new Date(b.released).getTime() > new Date(a.released).getTime())
          return 1;
        else return -1;
      });

      setBooks(sorted);
    }
  };

  return (
    <div className="App">
      <div>
        <button className="button" onClick={fetchData} disabled={isLoading}>
          {isLoading && <FaSpinner icon="spinner" className="spinner" />}
          {!isLoading && <span>Fetch Data</span>}
        </button>
      </div>
      <div className="sort">
        <button className="sortA" onClick={() => sortArray("dsc")}>↑</button>
        <button className="sortD" onClick={() => sortArray("asc")}>↓</button>
      </div>
      {error && (
        <div className="error">Error 404: Not Found</div>
      )}
      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(", ");

            return (
              <div className="book" key={index}>
                <h3>Book {++index}</h3>
                <h2>{book.name}</h2>
                <div className="details">
                  <p>
                    <FaBookReader /> : {authors}
                  </p>
                  <p>
                    <FaBook /> : {book.numberOfPages} Pages
                  </p>
                  <p>
                    <FaMapMarkerAlt /> : {book.country}
                  </p>
                  <p>
                    <FaCalendarCheck /> : {cleanedDate}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Fetch;
