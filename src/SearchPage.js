import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class SearchPage extends Component {
    //add a function that checks if getAll books.id matches searchResults book.id, if yes add shelf property to searchResults book with correct value
    static propTypes = {
        books: PropTypes.array.isRequired,
        searchResults: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    shelfAdd = (searchResults, books) => {
        for (let i = 0; i < books.length; i++) {
            for (let j = 0; j < searchResults.length; j++) {
                if (books[i].id === searchResults[j].id) {
                    searchResults[j].shelf = books[i].shelf;
                    console.log(searchResults[j].shelf);
                    console.log(searchResults);
                }
            }
        }
        return searchResults;
    }

    handleClick = (id, newShelf) => {
        let bookIndex;
        for (let i = 0; i < this.props.searchResults.length; i++) {
            if (this.props.searchResults[i].id === id) {
                bookIndex = this.props.searchResults[i];
            }
        }
        
        console.log(bookIndex);
        this.props.handleShelf(bookIndex, newShelf);
    }

    render() {
        const { searchResults, books, query, onChange } = this.props
        
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">My Reads Library</h1>
                    <Link
                        to="/"
                        >My Books</Link>
                </header>
                <main>
                    <form className="search-books-bar">
                        <input 
                            type="text" 
                            placeholder='Search'
                            value={query}
                            onChange={onChange}
                        />
                    </form>
                    {JSON.stringify(query)}
                    <h2>Search Results</h2>
                    {(searchResults.length === 0) ? 
                    <h3>No matches found for your search</h3> : (
                        <ul>
                            {this.shelfAdd(searchResults, books).map( book => (
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
                                                    onClick={() => this.handleClick(book.id, 'currentlyReading')}
                                                    className={(book.shelf === 'currentlyReading') ? "highlight" : ""}>Currently Reading</a>
                                                <a
                                                    onClick={() => this.handleClick(book.id, 'wantToRead')}
                                                    className={(book.shelf === 'wantToRead') ? "highlight" : ""}>Want to Read</a>
                                                <a
                                                    onClick={() => this.handleClick(book.id, 'read')} 
                                                    className={(book.shelf === 'read') ? "highlight" : ""}>Done Reading</a>
                                                <a
                                                    onClick={() => this.handleClick(book.id, 'undefined')} 
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
                    )}
                </main>
            </div>
        );
    }
}