
export function Rating({updateRating}) {
    function handleChange({target}){
        updateRating(target.value)
    }

    return <fieldset className="rating">
    <input type="radio" onChange={handleChange} id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
    <input type="radio" onChange={handleChange} id="star4half" name="rating" value="4.5" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
    <input type="radio" onChange={handleChange} id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
    <input type="radio" onChange={handleChange} id="star3half" name="rating" value="3.5" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
    <input type="radio" onChange={handleChange} id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
    <input type="radio" onChange={handleChange} id="star2half" name="rating" value="2.5" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
    <input type="radio" onChange={handleChange} id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" onChange={handleChange} id="star1half" name="rating" value="1.5" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
    <input type="radio" onChange={handleChange} id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
    <input type="radio" onChange={handleChange} id="starhalf" name="rating" value="0.5" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
</fieldset>
}