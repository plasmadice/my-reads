import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI';

class Books extends Component {

    state = {
        selected: '',
        currentShelf: '',
        moved: false
    }

    handleChange = (e) => {
        BooksAPI.update({id: e.target.id}, e.target.value);
        // Removes book from shelf and triggers a render
        if (this.state.selected !== 'none') {
            this.props.removeBook(e.target.id, this.state.selected);
        }

        this.setState({ currentShelf: e.target.value })
    }

    componentDidMount() {
        // because we cannot use defaultValue in a controlled component
        this.setState({ 
            selected: this.props.book.shelf,  
            currentShelf: this.props.shelf
        });
    }

    render() {
        const { book } = this.props;
        const { currentShelf } = this.state;
        console.log(this.props);
        
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ 
                        width: 128, 
                        height: 193, 
                        backgroundImage: `${book.imageLinks ? `url(${book.imageLinks.thumbnail})` : `url(https://books.google.com/books/content?id=1&printsec=frontcover&img=1&zoom=1&source=gbs_api)`}` }}>
                    </div>
                    <div className="book-shelf-changer">
                    <select 
                        id={book.id} 
                        onChange={this.handleChange} 
                        value={currentShelf}
                        >

                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" disabled={currentShelf === 'currentlyReading'}>Currently Reading</option>
                        <option value="wantToRead" disabled={currentShelf === 'wantToRead'}>Want to Read</option>
                        <option value="read" disabled={currentShelf === 'read'}>Read</option>
                        <option value="none" disabled={currentShelf === 'none'}>None</option>
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