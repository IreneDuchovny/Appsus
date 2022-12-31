const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

import { LongTxt } from "../cmps/long-txt.jsx"
import { AddReview } from '../cmps/add-review.jsx'

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.getBook(params.bookId)
            .then(book => setBook(book))
            .catch(err => onGoBack)
    }

    function onGoBack() {
        navigate('/book')
    }

    function setReadingStyle() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
        return ''
    }

    function setBookStyle() {
        const diff = (new Date(Date.now())).getFullYear() - book.publishedDate
        if (diff >= 10) return 'Vintage'
        if (diff <= 1) return 'New'
        return ''
    }

    function setBookAffordability() {
        if (book.listPrice.amount > 150) return 'expensive'
        if (book.listPrice.amount < 20) return 'cheap'
        return ''
    }

    function addReview(review) {
        bookService.addReview(book.id, review).then(book => {
            setBook(book)
            showSuccessMsg('Review added')
        })
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId).then(book => {
            setBook(book)
            showSuccessMsg('Review removed')
        })
    }

    if (!book) return <div>Loading...</div>
    return <section className="book-details flex">
        <div>
            <h5>{book.title}</h5>
            <h5>{book.subtitle}</h5>
            {book.authors.map((author, idx) =>
                <h5 key={idx}>{author}</h5>)}
            <h5>{book.publishedDate + ' ' + setBookStyle()}</h5>
            <h5>language: {book.language}</h5>
            <h5>{book.pageCount} Pages {setReadingStyle()}</h5>
            <h5>Categories:</h5>
            <ul>
                {book.categories.map((categorie, idx) =>
                    <li key={idx}>{categorie}</li>)}
            </ul>
            <img src={book.thumbnail} />
            <h5 className={`price ${setBookAffordability()}`}>{book.listPrice.amount + book.listPrice.currencyCode}</h5>
            <LongTxt txt={book.description} />
            {book.isOnSale && <h5>On Sale!</h5>}
            <br />
            <h5>Reviews:</h5>
            <br />
            {book.reviews && <ul>
                {book.reviews.map(review => {
                    return <li key={review.id}>rating: {review.rating}/5, by: {review.fullName}, read at: {review.readAt} <button className='btn-remove-review' onClick={() => onRemoveReview(review.id)}>X</button></li>
                })}
            </ul>}
            {!book.reviews && <h5>No reviews yet..</h5>}
        </div>
        <div>
            <AddReview addReview={addReview} />
            <div className="detalis-book-btns">
                <Link className="btn-edit-book" to={`/book/edit/${book.id}`}>Edit book</Link>
                <button className="btn-go-back" onClick={onGoBack}>Go Back</button>
            </div>
        </div>
    </section>
}