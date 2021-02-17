import React, { Component } from 'react'
import propTypes from 'prop-types'
import Book from './books'

class Shelves extends Component {
  static propTypes = {
    booksOnShelf: propTypes.array.isRequired,
    onClassBook: propTypes.func.isRequired
  }
  
  render() {
    const shelvesID = ["currentlyReading", "wantToRead", "read"]
    const shelvesNames = ["Currently Reading", "Want To Read", "Read"]

    return (

      <div>
        {shelvesID.map((shelf, index) => {
          return (
            <div key={index} className="list-books-content">
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelvesNames[index]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.booksOnShelf.filter(book => book.shelf === shelf).map(book => (
                      <Book 
                        onClassBook={this.props.onClassBook}
                        key={book.id}
                        book = {book}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )})
        }       
      </div>        
    )
  }
}

export default Shelves