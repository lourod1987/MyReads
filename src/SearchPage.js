import React, { Component } from 'react';

export class SearchPage extends Component {

    render() {
        return (
            <div className="App">
            <header className="App-header">
                <h1 className="App-title">My Reads Library</h1>
            </header>
            <main>
                <form>
                    <input type="text" value={this.state.query} onChange={this.onChange}/>
                </form>
                <ul>
                    <li>{}</li>
                </ul>
            </main>
        </div>
        );
    }
}