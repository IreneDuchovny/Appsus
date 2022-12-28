const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const isLoading = useRef(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        isLoading.current = true
        noteService.query()
            .then(notesToUpdate => {
                setNotes(notesToUpdate)
                isLoading.current = false
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
                    prevNotes.push(note)
                    return JSON.parse(JSON.stringify(prevNotes))
                })
            })
    }

    return <section className="note-index">
        {isLoading.current && <h2>loading..</h2>}
        {!isLoading.current && <NoteAdd onSaveNote={onSaveNote} />}
        {!isLoading.current && <NoteList notes={notes} onRemoveNote={onRemoveNote} />}
    </section>

}
