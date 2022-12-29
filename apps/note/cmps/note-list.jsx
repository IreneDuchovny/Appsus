import { NotePreview } from "./note-preview.jsx"
import { NoteBtns } from "./note-btns.jsx"

export function NoteList({ notes, onRemoveNote }) {
    return (
        <ul className="note-list clean-list grid">
            {notes.map(note => {
                return (
                    <li key={note.id}>
                        <NotePreview note={note} />
                        <NoteBtns className='note-btns' noteId={note.id} onRemoveNote={onRemoveNote} />
                    </li>
                )
            })}
        </ul>
    )
}
