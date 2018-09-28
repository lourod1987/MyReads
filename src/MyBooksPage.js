import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export class MyBooksPage extends Component {
    // static propTypes = {
        
    // }

    render() {
        const { books } = this.props;

        const reading = books.filter( book => (
            book.shelf === 'currentlyReading'
        ));

        const wantToRead = books.filter( book => (
            book.shelf === 'wantToRead'
        ));

        const doneReading = books.filter( book => (
            book.shelf === 'read'
        ));

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">My Reads Library</h1>
                    <Link
                        to="/search"
                    >Search</Link>
                </header>
                <main>
                        <h2>Currently Reading</h2>
                    <ul>
                        {reading.map( book => (
                            <li key={book.id}>
                            <figure>
                                <img src={book.imageLinks.thumbnail} alt={`Book cover for ${book.title}`}/>
                                <div className="dropdown">
                                    <button className="dropbtn">+</button>
                                    <div className="dropdown-content">
                                        <a>Currently Reading</a>
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
                    <h2>Want to Read</h2>
                    <ul>
                        {wantToRead.map( book => (
                            <li key={book.id}>
                            <figure>
                                <img src={book.imageLinks.thumbnail} alt={`Book cover for ${book.title}`}/>
                                <button></button>
                                <figcaption>
                                    <p>Title: {book.title}</p>
                                    <p>Author: {book.authors}</p>
                                </figcaption>
                            </figure>
                            </li>
                        ))}
                    </ul>
                    <h2>Done Reading</h2>
                    <ul>
                        {doneReading.map( book => (
                            <li key={book.id}>
                            <figure>
                                <img src={book.imageLinks.thumbnail} alt={`Book cover for ${book.title}`}/>
                                <button></button>
                                <figcaption>
                                    <p>Title: {book.title}</p>
                                    <p>Author: {book.authors}</p>
                                </figcaption>
                            </figure>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        );
    }
}