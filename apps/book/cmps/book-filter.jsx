const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function BookFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === "number"? +value : value
        setFilterByToEdit(prevFilter =>{
            return {...prevFilter, [field]: value}
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="book-filter">
        <form onSubmit={onSubmitFilter}>
            <label className='filter-label' htmlFor="price">filter by price:</label>
            <input type="range"
                id='price'
                name='price'
                min='0'
                max='200'
                value={filterByToEdit.price}
                onChange={handleChange}
                placeholder='Search by price' />
        </form>
        <Link className="btn-add-new-book" to={'/book/edit'}>Add new book</Link>
    </section>
}