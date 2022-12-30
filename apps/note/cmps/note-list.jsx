const { useState, useEffect, useRef } = React


import { NotePreview } from "./note-preview.jsx"
import { NoteBtns } from "./note-btns.jsx"
import { NoteEdit } from "./note-edit.jsx"


export function NoteList({ notes, onRemoveNote, onSaveNote, onDuplicateNote, onBgcolorChange, onPinNoteChange }) {
    const [noteToEdit, setNoteToEdit] = useState(null)

    function onEditing(note) {
        setNoteToEdit(note)
    }

    function onEndEditing() {
        setNoteToEdit(null)
    }


    return (
        <section>
            {noteToEdit &&
                <section className='edit-modal'> <NoteEdit endEditing={onEndEditing} noteToEdit={noteToEdit} onSaveNote={onSaveNote} /></section>}
            <ul className="note-list clean-list">
                {notes.map(note => (
                        <li key={note.id} style={note.style}>
                            <NotePreview note={note} />
                            <NoteBtns className='note-btns' note={note} onPinNoteChange={onPinNoteChange} onBgcolorChange={onBgcolorChange} onDuplicateNote={onDuplicateNote} onEditing={onEditing} onRemoveNote={onRemoveNote} />
                        </li>
                ))}
            </ul>
        </section>
    
    )
}
