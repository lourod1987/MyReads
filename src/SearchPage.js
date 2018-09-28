import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export class SearchPage extends Component {

    render() {
        const { searchResults, query, onChange } = this.props
        
        // const searchTerms = books.filter( book => (
        //     book.title == query
        // ));
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
                    {(searchResults === undefined) ? 
                    <h3>No search results found</h3> : (
                        <ul>
                            {searchResults.map( book => (
                                <li key={book.id}>
                                <figure>
                                    {book.imageLinks !== undefined && (
                                    <img src={book.imageLinks.thumbnail} alt={`Book cover for ${book.title}`}/>)}
                                    <div className="dropdown">
                                        <button className="dropbtn">+</button>
                                        <div className="dropdown-content">
                                            <a >Currently Reading</a>
                                            <a >Want to Read</a>
                                            <a >Done Reading</a>
                                            <a >None</a>
                                        </div>
                                    </div>
                                    <figcaption>
                                        <p>Title: {book.title}</p>
                                        <p>Author: {book.authors}</p>
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