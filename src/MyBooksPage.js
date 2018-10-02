import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BookList } from './BookList';

export class MyBooksPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        handleShelf: PropTypes.func.isRequired,
    }

    handleClick = (id, newShelf, books) => {
        let bookIndex;
        for (let i = 0; i < this.props.books.length; i++) {
            if (this.props.books[i].id === id) {
                bookIndex = this.props.books[i];
            }
        }
        
        // console.log(bookIndex);
        this.props.handleShelf(bookIndex, newShelf, books);
        // this.handleFilter(this.props.books, newShelf)
    }

    handleFilter = (books, filter) => {
        return books.filter( book => (
            book.shelf === filter
        ));
    }

    render() {
        const { books, handleShelf } = this.props;

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
                    <BookList
                        books={books}
                        handleShelf={handleShelf}
                        handleClick={this.handleClick}
                        handleFilter={this.handleFilter}
                        shelfFilter="currentlyReading"
                    />
                    <h2>Want to Read</h2>
                    <BookList
                        books={books}
                        handleShelf={this.handleShelf}
                        handleClick={this.handleClick}
                        handleFilter={this.handleFilter}
                        shelfFilter="wantToRead"
                    />
                    
                    <h2>Done Reading</h2>
                    <BookList
                            books={books}
                            handleShelf={this.handleShelf}
                            handleClick={this.handleClick}
                            handleFilter={this.handleFilter}
                            shelfFilter="read"
                    />
                </main>
            </div>
        );
    }
}