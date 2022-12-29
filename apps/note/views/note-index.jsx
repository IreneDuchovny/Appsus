const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

import { NoteList } from "../cmps/note-list.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [isLoading,setIsLoading] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        setIsLoading(true)
        noteService.query()
            .then(notesToUpdate => {
                setNotes(notesToUpdate)
                setIsLoading(false)
            })
    }

    function onRemoveNote(noteId) {
        noteService.removeNote(noteId)
            .then(() => {
                const notesToUpdate = notes.filter(note => note.id !== noteId)
                setNotes(notesToUpdate)
            })
    }

    function onSaveNote(note) {
        noteService.saveNote(note)
            .then(note => {
                setNotes(prevNotes => {
                    prevNotes.unshift(note)
                    return JSON.parse(JSON.stringify(prevNotes))
                })
            })
    }

    return <section className="note-index">
        {isLoading && <h2>loading..</h2>}
        {!isLoading && <NoteEdit onSaveNote={onSaveNote} />}
        {!isLoading && <NoteList notes={notes} onRemoveNote={onRemoveNote} />}
    </section>

}
