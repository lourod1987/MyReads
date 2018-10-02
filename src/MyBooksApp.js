import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { MyBooksPage } from './MyBooksPage';
import { SearchPage } from './SearchPage';

export class MyBooksApp extends Component {
    state = {
        query: '',
        shelf: '',
        books: [],
        bookPut: {},
        searchResults: []
    }

    handleSearch = query => {
        this.setState({ query: query })
        BooksAPI.search(query).then( searchResults => {
            if (searchResults !== undefined && searchResults.error !== 'empty query') {
                this.setState({ searchResults }); 
            }
            
            if (searchResults === undefined || searchResults.error === 'empty query') {
                this.setState({ searchResults: [] });
            }
            
        })
    }

    handleShelf = (bookPut, shelf, books) => {
        // console.log(bookPut);
        // let newBooks = books;
        BooksAPI.update(bookPut, shelf).then(books => {
            // books = this.state.books;
            console.log(books)
            // this.setState({
            //     books: books
            // });
        })

        BooksAPI.getAll().then( books => {
            this.setState({ books })
        })

        // return books;
        // .then( (bookPut) => {
            // this.setState({
            //     books: newBooks
            // });
    }

    componentDidMount() {
        BooksAPI.getAll().then( books => {
            this.setState({ books })
            // console.log(books)
        })
            
    }
    
    render() {
        const { books, query, shelf, searchResults, bookPut } = this.state;

        return (
            <div>
                <Route exact path="/" render={() => (
                    <MyBooksPage
                        books={books}
                        bookPut={bookPut}
                        shelf={shelf}
                        handleShelf={this.handleShelf}
                        readingShelf={this.state.readingShelf}
                    />
                )}/>
                <Route exact path="/search" render={() => (
                    <SearchPage
                        query={query}
                        onChange={ evt => this.handleSearch(evt.target.value) } 
                        searchResults={searchResults}
                        books={books}
                        handleShelf={this.handleShelf} 
                    />
                )}/>
            </div>
        );
    }
}