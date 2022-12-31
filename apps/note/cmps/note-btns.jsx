const { useNavigate } = ReactRouterDOM

export function NoteBtns({ note, onRemoveNote, onEditing, onDuplicateNote, onBgcolorChange, onPinNoteChange }) {
    const navigate = useNavigate()

    function removeNote() {
        onRemoveNote(note.id)
    }

    function bgColorChange({ target }) {
        onBgcolorChange(note.id, target.value)
    }

    function onSendNote(note) {
        const subject = note.info.title
        let body
        if (note.type === 'note-todos') {
            body = note.info.todos.map(todo => todo.txt).join(',')
        }
        if (note.type === 'note-txt') {
            body = note.info.txt
        }
        if (note.type === 'note-img' || note.type === 'note-video') {
            body = note.info.url
        }

        const queryStringParams = `?subject=${subject}&body=${body}`
        const newUrl = '../' + '/mail/new/compose' + queryStringParams
        navigate(newUrl)

    }

    return <section className="note-btns flex">
        <button style={note.style} className="btn-toggle-pin-note" onClick={() => onPinNoteChange(note.id)}><i className="fa-solid fa-thumbtack"></i></button>
        <button style={note.style} className="btn-remove-note" onClick={removeNote}><i className="fa-regular fa-trash-can"></i></button>
        <button style={note.style} className="btn-update-note" onClick={() => onEditing(note)}><i className="fa-regular fa-pen-to-square"></i></button>
        <button style={note.style} className="btn-duplicate-note" onClick={() => onDuplicateNote(note)}><i className="fa-solid fa-copy"></i></button>
        <button style={note.style} className="btn-send-note" onClick={() => onSendNote(note)}><i className="fa-solid fa-paper-plane"></i></button>
        <label style={note.style}> <i className="fa-solid fa-palette"></i><input type="color" onChange={bgColorChange} /></label>
    </section>
}