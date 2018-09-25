import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import { MyBooksPage } from './MyBooksPage';
import { SearchPage } from './SearchPage';

export class MyBooksApp extends Component {
    state = {
        query: ''
    }

    handleSearch = evt => {
        this.setState({query: evt.target.value})
    }

    componentDidMount() {
        console.log(BooksAPI.getAll());
    }

    render() {
        return (
            <div>
                <MyBooksPage />
                {/* <SearchPage onChange={handleSearch} /> */}
            </div>
        );
    }
}