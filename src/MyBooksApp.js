import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { MyBooksPage } from './MyBooksPage';
import { SearchPage } from './SearchPage';

export class MyBooksApp extends Component {
    state = {
        query: '',
        changeShelf: '',
        books: [],
        searchResults: []
    }

    handleSearch = query => {
        this.setState({ query: query })
        BooksAPI.search(query).then( searchResults => {
            if (searchResults !== undefined && searchResults.error !== 'empty query') {
                this.setState({ searchResults })
            } 
            
            // if (searchResults === undefined || searchResults.error === 'empty query') {
            //     this.setState({ searchResults: [] })
            // }
            console.log(searchResults);
        })
    }

    // handleShelf() {
    //     BooksAPI.update(books, shelf).then( books => this.setState({ shelf: changeShelf }))
    // }

    componentDidMount() {
        // console.log(BooksAPI.getAll());
        BooksAPI.getAll().then( books => this.setState({ books }))
    }
    
    render() {
        // console.log(this.state.books);
        return (
            <div>
                <Route exact path="/" render={() => (
                    <MyBooksPage  books={this.state.books} />
                )}/>
                <Route exact path="/search" render={() => (
                    <SearchPage 
                        query={this.state.query} 
                        onChange={ evt => this.handleSearch(evt.target.value) } 
                        searchResults={this.state.searchResults}
                    />
                )}/>
            </div>
        );
    }
}