import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI';

class Books extends Component {
    updateBook = (book) => {

    }

    render() {
        const { book } = this.props;
        
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ 
                        width: 128, 
                        height: 193, 
                        backgroundImage: `${book.imageLinks ? `url(${book.imageLinks.thumbnail})` : `url(https://books.google.com/books/content?id=1&printsec=frontcover&img=1&zoom=1&source=gbs_api)`}` }}>
                    </div>
                    <div className="book-shelf-changer">
                    <select defaultValue={book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && (
                    book.authors.map((author, index) => {
                        /* Handles multiple authors
                            & lack of authors */
                        return (book.authors.length !== index+1) ? `${author}, ` : author;
                    })
                )}</div>
            </div>
        )
    }
}

export default Books;