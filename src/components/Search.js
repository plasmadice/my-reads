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

    // Only search if at least 2 letters are present in query
    fetchBooks = (query) => {
        if (query.length < 2) {
            this.setState({ books: [] });
        } else {
            BooksAPI.search(query).then(books => {
                this.setState({ books: books })
            })
        }
    }

    // Controls search form value
    handleChange = (e) => {
        this.setState({ query: e.target.value });
    }

    // Grabs user's books and saves them to state
    componentDidMount() {
        let books = [] 
        BooksAPI.getAll().then(response => {
            response.map(book => books.push({id: book.id, shelf: book.shelf}))
        })
        this.setState({ shelvedBooks: books })
    }

    // Fetches each time form query changes (each time letter is added or removed)
    componentDidUpdate = (prevProps, prevState) => {
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