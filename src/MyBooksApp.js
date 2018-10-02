import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { MyBooksPage } from './MyBooksPage';
import { SearchPage } from './SearchPage';

export class MyBooksApp extends Component {
    state = {
        query: '',
        shelf: '',
        allMyBooks: [],
        currentReads: [],
        wantReads: [],
        doneReads: [],
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

    shelfAssign = (allMyBooks) => {
       const curReads = allMyBooks.filter( book => (
            book.shelf === 'currentlyReading'
        ));
       
        const wantReads = allMyBooks.filter( book => (
            book.shelf === 'wantToRead'
        ));
        
        const read = allMyBooks.filter( book => (
            book.shelf === 'read'
        ));
        
        this.setState({ 
            currentReads: curReads,
            wantReads: wantReads,
            doneReads: read
         })

         console.log(this.state.doneReads);
        // const none = allMyBooks.filter( book => (
        //     book.shelf === undefined
        // ));
    }

    handleShelf = (bookPut, shelf) => {
        // console.log(bookPut);
        // let newBooks = books;
        BooksAPI.update(bookPut, shelf)
        // .then(books => {
            // books = this.state.books;
            // console.log(books)
            // this.setState({
            //     books: books
            // });
        // })

        BooksAPI.getAll().then( books => {
            this.setState({ allMyBooks: books })
        })
    }

    componentDidMount() {
        BooksAPI.getAll().then( allMyBooks => {
            this.setState({ allMyBooks });
            this.shelfAssign(allMyBooks);
        })
        // console.log(this.state.allMyBooks);
    }
    
    render() {
        const { allMyBooks, currentReads, wantReads, doneReads, query, shelf, searchResults, bookPut } = this.state;

        return (
            <div>
                <Route exact path="/" render={() => (
                    <MyBooksPage
                        allMyBooks={allMyBooks}
                        currentReads={currentReads}
                        wantReads={wantReads}
                        doneReads={doneReads}
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
                        allMyBooks={allMyBooks}
                        handleShelf={this.handleShelf} 
                    />
                )}/>
            </div>
        );
    }
}