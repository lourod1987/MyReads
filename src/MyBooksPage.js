import React, { Component } from 'react';

export class MyBooksPage extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">My Reads Library</h1>
                </header>
                <main>
                    <ul>
                        <li>{}</li>
                    </ul>
                    <ul>
                        <li>{}</li>
                    </ul>
                    <ul>
                        <li>{}</li>
                    </ul>
                    {/* <currentReads></currentReads>
                    <wantToRead></wantToRead>
                    <alreadyRead></alreadyRead> */}
                </main>
            </div>
        );
    }
}