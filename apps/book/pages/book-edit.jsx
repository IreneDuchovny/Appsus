const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.getBook(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => onGoBack)
    }

    function onGoBack() {
        navigate('/book')
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        value = field === 'authors' || field === 'categories' ? value.split(',') : value
        value = type === 'checkbox'? target.checked : value

        if (field === 'amount' || field === 'currencyCode' || field === 'isOnSale') {  
            setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, [field]: value } }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.saveBook(bookToEdit).then((book) => {
            showSuccessMsg('Book saved!')
            onGoBack()
        })
        .catch((err) => {
            showErrorMsg('Could not save book, try again please!')
        })
    }

    return <section className="book-edit">
        <form onSubmit={onSaveBook}>
            <label htmlFor="title">Title:</label>
            <input type="text"
                id='title'
                name='title'
                placeholder='Enter Title'
                value={bookToEdit.title}
                onChange={handleChange} />
            <label htmlFor="subtitle">Subtitle:</label>
            <input type="text"
                id='subtitle'
                name='subtitle'
                placeholder='Enter Subtitle'
                value={bookToEdit.subtitle}
                onChange={handleChange} />
            <label htmlFor="authors">Authors:</label>
            <input type="text"
                id='authors'
                name='authors'
                placeholder='Enter Authors'
                value={bookToEdit.authors.join(',')}
                onChange={handleChange} />
            <label htmlFor="published-date">Published date:</label>
            <input type="number"
                id='published-date'
                name='publishedDate'
                placeholder='Enter Published date'
                value={bookToEdit.publishedDate}
                onChange={handleChange} />
            <label htmlFor="description">Description:</label>
            <input type="text"
                id='description'
                name='description'
                placeholder='Enter Description'
                value={bookToEdit.description}
                onChange={handleChange} />
            <label htmlFor="page-count">Page count:</label>
            <input type="number"
                id='page-count'
                name='pageCount'
                placeholder='Enter Page count'
                value={bookToEdit.pageCount}
                onChange={handleChange} />
            <label htmlFor="categories">Categories:</label>
            <input type="text"
                id='categories'
                name='categories'
                placeholder='Enter Categories'
                value={bookToEdit.categories.join(',')}
                onChange={handleChange} />
            <label htmlFor="thumbnail">Thumbnail:</label>
            <input type="text"
                id='thumbnail'
                name='thumbnail'
                placeholder='Enter thumbnail'
                value={bookToEdit.thumbnail}
                onChange={handleChange} />
            <label htmlFor="language">Language:</label>
            <input type="text"
                id='language'
                name='language'
                placeholder='Enter Language'
                value={bookToEdit.language}
                onChange={handleChange} />
            <label htmlFor="amount">Amount:</label>
            <input type="number"
                id='amount'
                name='amount'
                placeholder='Enter Amount'
                value={bookToEdit.listPrice.amount}
                onChange={handleChange} />
            <label htmlFor="currency-code">Currency code:</label>
            <input type="text"
                id='currency-code'
                name='currencyCode'
                placeholder='Enter Currency code'
                value={bookToEdit.listPrice.currencyCode}
                onChange={handleChange} />
            <label htmlFor="is-on-sale">Is on sale:</label>
            <input type="checkbox"
                id='is-on-sale'
                className= 'is-on-sale'
                name='isOnSale'
                checked={bookToEdit.listPrice.isOnSale}
                onChange={handleChange} />
            <button>Add book</button>
        </form>
    </section>
}