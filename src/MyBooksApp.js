import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { MyBooksPage } from './MyBooksPage';
import { SearchPage } from './SearchPage';

export class MyBooksApp extends Component {
    state = {
        query: '',
        allMyBooks: [],
        currentReads: [],
        wantReads: [],
        doneReads: [],
        searchResults: []
    }

    handleSearch = query => {
        this.setState({ query: query });
        if (query !== '') {
            BooksAPI.search(query).then( searchResults => {
                if (searchResults !== undefined && searchResults.error !== 'empty query') {
                    this.setState({ searchResults }); 
                }
                
                if (searchResults === undefined || searchResults.error === 'empty query') {
                    this.setState({ searchResults: [] });
                }
            });
        } else {
            this.setState({ searchResults: [] });
        }
    }

    handleShelf = (bookPut, shelf) => {
         
        BooksAPI.update(bookPut, shelf)
            .then(bookReply => {
                const { allMyBooks, searchResults } = this.state
                
                for (let i = 0; i < bookReply.currentlyReading.length; i++) {
                    for (let j = 0; j < allMyBooks.length; j++){
                        if (bookReply.currentlyReading[i] === allMyBooks[j].id) {
                            bookReply.currentlyReading[i] = allMyBooks[j];
                            bookReply.currentlyReading[i].shelf = 'currentlyReading';
                        }
                    }
                }
                for (let i = 0; i < bookReply.wantToRead.length; i++) {
                    for (let j = 0; j < allMyBooks.length; j++){
                        if (bookReply.wantToRead[i] === allMyBooks[j].id) {
                            bookReply.wantToRead[i] = allMyBooks[j];
                            bookReply.wantToRead[i].shelf = 'wantToRead';
                        }
                    }
                }
                for (let i = 0; i < bookReply.read.length; i++) {
                    for (let j = 0; j < allMyBooks.length; j++){
                        if (bookReply.read[i] === allMyBooks[j].id) {
                            bookReply.read[i] = allMyBooks[j];
                            bookReply.read[i].shelf = 'read';
                        }
                    }
                }

                for (let i = 0; i < bookReply.currentlyReading.length; i++) {
                    for (let j = 0; j < searchResults.length; j++){
                        if (bookReply.currentlyReading[i] === searchResults[j].id) {
                            bookReply.currentlyReading[i] = searchResults[j];
                            bookReply.currentlyReading[i].shelf = 'currentlyReading';
                        }
                    }
                }
                for (let i = 0; i < bookReply.wantToRead.length; i++) {
                    for (let j = 0; j < searchResults.length; j++){
                        if (bookReply.wantToRead[i] === searchResults[j].id) {
                            bookReply.wantToRead[i] = searchResults[j];
                            bookReply.wantToRead[i].shelf = 'wantToRead';
                        }
                    }
                }
                for (let i = 0; i < bookReply.read.length; i++) {
                    for (let j = 0; j < searchResults.length; j++){
                        if (bookReply.read[i] === searchResults[j].id) {
                            bookReply.read[i] = searchResults[j];
                            bookReply.read[i].shelf = 'read';
                        }
                    }
                }


                if (shelf === 'undefined') {
                    bookPut.shelf = undefined;    
                }

                BooksAPI.getAll().then( books => {
                    this.setState({ allMyBooks: books })
                });

                this.setState({
                    currentReads: bookReply.currentlyReading,
                    wantReads: bookReply.wantToRead,
                    doneReads: bookReply.read
                });
            });

    }

    componentDidMount() {
        BooksAPI.getAll().then( allMyBooks => {
            this.setState({ allMyBooks });

            const curReads = this.state.allMyBooks.filter( book => (
                book.shelf === 'currentlyReading'
            ));
           
            const wantReads = this.state.allMyBooks.filter( book => (
                book.shelf === 'wantToRead'
            ));
            
            const read = this.state.allMyBooks.filter( book => (
                book.shelf === 'read'
            ));

            this.setState({ 
                currentReads: curReads,
                wantReads: wantReads,
                doneReads: read
             });
            
        });
    }
    
    render() {
        const { allMyBooks, currentReads, wantReads, doneReads, query, searchResults } = this.state;

        return (
            <div>
                <Route exact path="/" render={() => (
                    <MyBooksPage
                        allMyBooks={allMyBooks}
                        currentReads={currentReads}
                        wantReads={wantReads}
                        doneReads={doneReads}
                        handleShelf={this.handleShelf}
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