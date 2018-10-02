import React from 'react'
import * as BooksAPI from '../BooksAPI'
import './App.css'
import Search from './Search';
import Shelf from './Shelf';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    updated: false,
  }

  fetchBooks = () => {
    // Fetches books and separates by shelf using .map
    BooksAPI.getAll().then(books => {
      let bookObj = {
        currentlyReading: [],
        wantToRead: [],
        read: []
      };

      books.map((book) => bookObj[book.shelf].push(book))

      this.setState({ books: bookObj })
    })
  }

  removeBook = (bookId, bookShelf) => {
    let newObj = {};
    Object.assign(newObj, this.state.books);
    newObj[bookShelf] = this.state.books[bookShelf].filter(book => book.id !== bookId)
    this.setState({ books: newObj, updated: true })
  }

  componentDidMount = () => {
    this.fetchBooks();
  }

  componentDidUpdate() {
    if (this.state.updated && Object.keys(this.state.books).length) {
      this.setState({ updated: false })
      setTimeout(() => this.fetchBooks(), 500)
    }
  }
  
  render() {

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {/*Each shelf component gets it's own filtered books*/}               
                <Shelf 
                  shelfName={'Currently Reading'}
                  books={this.state.books.currentlyReading} 
                  removeBook={this.removeBook}
                />
  
                <Shelf 
                  shelfName={'Want to Read'}
                  books={this.state.books.wantToRead} 
                  removeBook={this.removeBook}
                />
  
                <Shelf 
                  shelfName={'Read'}
                  books={this.state.books.read} 
                  removeBook={this.removeBook}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a Book</Link>
            </div>
          </div>
        )}/>
        <Route exact path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
