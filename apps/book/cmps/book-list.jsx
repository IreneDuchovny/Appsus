const { Link } = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx"

export function BookList({ books, onRemoveBook }) {
    return <ul className="book-list clean-list">
        {
            books.map(book => {
                return <li key={book.id}>
                    <BookPreview book={book} />
                    <div className="book-btns">
                        <Link className="btn-select" to={`/book/${book.id}`}>Select</Link>
                        <button className="btn-remove" onClick={() => onRemoveBook(book.id)}>Remove</button>
                    </div>
                </li>
            })
        }
    </ul>
}
