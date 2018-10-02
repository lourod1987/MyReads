import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class BookList extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        handleClick: PropTypes.func.isRequired,
        handleFilter: PropTypes.func.isRequired,
        shelfFilter: PropTypes.string.isRequired,
    }

    render() {
        const { books, handleClick, handleFilter, shelfFilter } = this.props;

        return (
            <ul>
            {handleFilter(books, shelfFilter).map( (book) => (
                <li key={book.id}>
                    <figure>
                        {book.imageLinks !== undefined && (
                            <img
                                src={book.imageLinks.thumbnail} 
                                alt={`Book cover for ${book.title}`}
                                className="book-cover"
                            />
                        )}
                        <div className="dropdown">
                            <button className="dropbtn">+</button>
                            <div className="dropdown-content">
                                <a
                                    onClick={() => handleClick(book.id, 'currentlyReading', books)}
                                    className={(book.shelf === 'currentlyReading') ? "highlight" : ""}>Currently Reading</a>
                                <a
                                    onClick={() => handleClick(book.id, 'wantToRead', books)}
                                    className={(book.shelf === 'wantToRead') ? "highlight" : ""}
                                >Want to Read</a>
                                <a
                                    onClick={() => handleClick(book.id, 'read', books)}
                                    className={(book.shelf === 'read') ? "highlight" : ""}>Done Reading</a>
                                <a 
                                    onClick={() => handleClick(book.id, 'undefined', books)}
                                    className={(book.shelf === undefined) ? "highlight" : ""}>None</a>
                            </div>
                        </div>
                        <figcaption className="book-cover-title">
                            <p>Title: {book.title}</p>
                            {book.authors !== undefined && (
                                <ul className="author">
                                    {book.authors.map( author => (
                                        <li key={author}>Author: {author}</li>
                                    ))}
                                </ul>
                            )}
                        </figcaption>
                    </figure>
                </li>
            ))}
        </ul>
        )
    }
}