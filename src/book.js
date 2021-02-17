import React, { Component } from 'react'
import propTypes from 'prop-types'


class Book extends Component {

    static propTypes = {
        book: propTypes.object.isRequired,
        onMoveBook: propTypes.func.isRequired
    }

    updateShelf(shelf){
        this.props.onMoveBook(this.props.book, shelf)
    }

    render() {
        const { book } = this.props
        return (          
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail: ''})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => this.updateShelf(event.target.value)}>
                            <option value="move" disabled defaultValue>Move to...</option>
                            <option value="none">None</option>                        
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                     </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}












export default Book