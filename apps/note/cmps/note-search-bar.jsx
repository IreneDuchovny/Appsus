

export function NoteSearchBar(){

    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())

    return <section className="note-search-bar">
        <input type="search"
        value = '' />
    </section>
}