const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteAdd({ onSaveNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote('txt'))

    function handleChange({ target }) {
        let { name: field, value } = target
        setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function saveNote(ev) {
        ev.preventDefault()
        onSaveNote(note)
        setNote(noteService.getEmptyNote())
    }

    return <section className="note-add">
        <form onSubmit={saveNote}>
            <input
                type="text"
                name='txt'
                placeholder = "Whats on your mind.."
                value={note.info.txt}
                onChange={handleChange} />
        </form>
    </section>
}