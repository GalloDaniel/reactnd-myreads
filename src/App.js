import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './bookshelf'
import Header from './header'
import { Link, Route } from 'react-router-dom'
import Search from './search'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  
  moveBook = (book, shelf) => {
    if (this.state.books){
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      })
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books
        }))
      })     
  }
  
  render() {
    return(
      
      <div>
        <Route exact path='/' render={() => (
        <div>  
          <Header />
          <BookShelf 
            onMoveBook={this.moveBook}
            booksOnShelf={this.state.books}
          />          
          <div className="open-search">
          <Link 
             to='/search'
          >Add a book</Link>
          </div>
        </div>

        )} />
        {<Route path='/search' render={() => (
          <Search 
            onMoveBook={this.moveBook}
            booksOnShelf={this.state.books}
          />)} 
        />}
      </div>
    )
  }
}

export default BooksApp
