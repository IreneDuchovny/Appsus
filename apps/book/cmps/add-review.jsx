const { useState, useEffect } = React

import { Rating } from "./rating.jsx";


export function AddReview({addReview}) {

    const [review, SetReview] = useState({ fullName: '', rating: 0, readAt: '' })

    function updateRating(rating) {
        rating = +rating
        SetReview(prevReview => ({ ...prevReview, rating: rating }))
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        SetReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onAddReview(ev) {
        ev.preventDefault()
        addReview(review)
    }



    return <section className="add-review">
        <h2>Add Review</h2>
        <form onSubmit={onAddReview}>
            <Rating updateRating={updateRating} />
            <label htmlFor="full-name">Full name:</label>
            <input type="text"
                id='full-name'
                name='fullName'
                placeholder='Enter full name'
                value={review.fullName}
                onChange={handleChange} />
            <label htmlFor="read-at">Read at:</label>
            <input type="date"
                id='read-at'
                name='readAt'
                value={review.readAt}
                onChange={handleChange} />

            <button>Add review</button>
        </form>
    </section>
}