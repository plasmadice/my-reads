import React from 'react'
import * as BooksAPI from '../BooksAPI'
import './App.css'
import Search from './Search';
import Shelf from './Shelf';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  fetchBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books })
    })
  }

  componentDidMount = () => {
    this.fetchBooks();
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
                <Shelf 
                  shelfName={'Currently Reading'}
                  books={this.state.books.filter(book => book.shelf === 'currentlyReading')} 
                />
  
                <Shelf 
                  shelfName={'Want to Read'}
                  books={this.state.books.filter(book => book.shelf === 'wantToRead')} 
                />
  
                <Shelf 
                  shelfName={'Read'}
                  books={this.state.books.filter(book => book.shelf === 'read')} 
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
