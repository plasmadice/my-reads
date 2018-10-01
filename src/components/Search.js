import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class Search extends Component {
    state = {
        query: '',
        books: [],
    }

    fetchBooks = (query) => {
        BooksAPI.search(query).then(books => {
            this.setState({ books: books })
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.query !== this.state.query) {
            this.fetchBooks(this.state.query);
        }
    }
    
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ query: e.target.value })
    }

    render() {
        console.log(this.state.books)
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author" 
                            onChange={this.handleChange}
                            value={this.state.query}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books && (
                            this.state.books.map(book => {
                                book.shelf='none';
                                return <li key={book.id}>
                                    <Book book={book}/>
                                </li>
                            })
                        )}
                    </ol>
                </div>
        </div>
        )
    }
}

export default Search;