import React from 'react'
import Book from './Book';

const Shelf = (props) => {
    const { books, shelfName } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <li key={book.id}>
                            <Book book={book} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Shelf;