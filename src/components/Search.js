import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

class Search extends Component {
    state = {
        query: '',
        books: [],
        shelvedBooks: []
    }

    // TODO: address issue with 'art' vs 'artificial intellegence'
    // TODO: might be related, search for multiple words
    fetchBooks = (query) => {
        // Only search if at least 2 letters are present in query
        if (query.length < 2) {
            this.setState({ books: [] });
        } else {
            BooksAPI.search(query).then(books => {
                this.setState({ books: books })
            })
        }
    }

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    }

    componentDidMount() {
        let books = [] 
        BooksAPI.getAll().then(response => {
            response.map(book => books.push({id: book.id, shelf: book.shelf}))
        })
        this.setState({ shelvedBooks: books })
    }

    componentDidUpdate = (prevProps, prevState) => {
        // Fetches each time form query changes (each time letter is added or removed)
        if (prevState.query !== this.state.query) {
            this.fetchBooks(this.state.query);
        }
    }

    render() {
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" onClick={this.props.handleClick}>Close</Link>
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
                    {/* Generates books if this.state.books exists and is not empty */}
                        {this.state.books && this.state.books[0] && (
                            this.state.books.map(book => {
                                let shelfCheck = this.state.shelvedBooks.filter(a => a.id === book.id)
                                book.shelf='none';
                                return <li key={book.id}>
                                    <Book 
                                        book={book}
                                        shelf={shelfCheck[0] ? shelfCheck[0].shelf : 'none'}
                                    />
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