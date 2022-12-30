const { useState} = React

import { eventBusService } from "../services/event-bus.service.js"

export function SearchBar(){

    const [filterByTxt, setFilterByTxt] = useState('')

    function handleChange({target}){
        setFilterByTxt(target.value)
        eventBusService.emit('search', target.value)
    }

    return (
        <input className="searchbar-input" type="search" placeholder = 'Search..'
        value = {filterByTxt}
        onChange={handleChange} />
    )
}