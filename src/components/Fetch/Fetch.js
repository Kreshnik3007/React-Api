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
      setError(error.message);
    }
    setIsLoading(false);
  };

  const ascHandler = () => {
    let sorted = [...books].sort((a, b) => {
      return new Date(a.released) - new Date(b.released);
    });
    setBooks(sorted);
  };

  const dscHandler = () => {
    let sorted = [...books].sort((a, b) => {
      return new Date(b.released) - new Date(a.released);
    });
    setBooks(sorted);
  };

  return (
    <div className="App">
      <div>
        <button className="button" onClick={fetchData} disabled={isLoading}>
          {isLoading ? (<FaSpinner icon="spinner" className="spinner" />) : (<span>Fetch Data</span>)}
        </button>
      </div>
      <div className="sort">
        <button className="sortA" onClick={ascHandler}>↑</button>
        <button className="sortD" onClick={dscHandler}>↓</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(", ");
            const bookNumber = index;
            return (
              <div className="book" key={index}>
                <h3>Book {bookNumber + 1}</h3>
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
