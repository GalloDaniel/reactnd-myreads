import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './books'

class Search extends Component {
    static propTypes = {
        booksOnShelf: propTypes.array.isRequired,
        onClassBook: propTypes.func.isRequired
    }
    
    state = {
        query: '',
        books:[]
    }

    updateQuery = (query) => {
        if (query === '') {
            this.setState({
                query: '', 
                books: []
            })
        } else {
            this.setState({ query: query.trim() })
            BooksAPI.search(query).then((books) => {
                if (books.error){
                    books = []
                }
                books.map(book => (this.props.booksOnShelf.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
                this.setState({books})
            })
        }
    }
    
    render(){
        const { query } = this.state.query;
          
        return (           
           <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        className="close-search" 
                        to='/'>Close
                    </Link>
                     <div className="search-books-input-wrapper">             
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value= {query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                         />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.state.books.map(book => (
                                <Book
                                onClassBook={this.props.onClassBook}
                                key={book.id}
                                book={book}
                                />
                                ))}
                            </ol>
                        </div>
                    </ol>
                </div>
            </div>
        )
    }    
} 

export default Search