const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg,eventBusService } from '../../../services/event-bus.service.js'

import {BookList} from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'

export function BookIndex() {

    const [books, SetBooks] = useState([])
    let [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    useEffect(() => {
        const unsubscribe = eventBusService.on('search', (search) => {
            filterBy = { ...filterBy, title: search }
            loadBooks()
        })

        return unsubscribe

    }, [])

    function loadBooks() {
        bookService.query(filterBy).then(booksToUpdate => { SetBooks(booksToUpdate) })
    }

    function onSetFilter(newFilterby) {
        setFilterBy(newFilterby)
    }

    function onRemoveBook(bookId) {
        bookService.removeBook(bookId).then(() => {
            const updateBooks = books.filter(book => book.id !== bookId)
            SetBooks(updateBooks)
            showSuccessMsg('Car removed')
        })
            .catch((err) => {
                showErrorMsg('Could not remove car, try again please!')
            })
    }

    return <section className="book-index main-layout">
        <BookFilter onSetFilter={onSetFilter} />
        <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
}