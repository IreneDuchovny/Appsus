const { useState, useEffect, useRef } = React
const { Link, useParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

import { NoteList } from "../cmps/note-list.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"
import { NoteSideBar } from "../cmps/note-side-bar.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(null)
    let [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    let { noteType } = useParams()

    useEffect(() => {
        noteType = noteType ? noteType : ''
        if (noteType) filterBy = { ...filterBy, type: noteType }
        loadNotes()
    }, [noteType])

    useEffect(() => {
        const unsubscribe = eventBusService.on('search', (search) => {
            filterBy = { ...filterBy, search: search }
            loadNotes()
        })



        return unsubscribe

    }, [])

    function loadNotes() {
        setIsLoading(true)
        noteService.query(filterBy)
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
        const isUpdate = note.id ? true : false
        noteService.saveNote(note)
            .then(note => {
                if (isUpdate) {
                    const idx = notes.findIndex(currNote => currNote.id === note.id)
                    notes[idx] = note
                } else {
                    notes.unshift(note)
                }
                setNotes(JSON.parse(JSON.stringify(notes)))
            })
    }

    function onDuplicateNote(note) {
        const newNote = JSON.parse(JSON.stringify(note))
        delete newNote.id
        onSaveNote(newNote)
    }

    function onBgcolorChange(noteId, bgcolor) {
        noteService.updateBgcolor(noteId, bgcolor)
            .then(note => {
                onSaveNote(note)
            })
    }

    function onPinNoteChange(noteId) {
        noteService.getNote(noteId)
            .then(note => {
                note.isPinned = !note.isPinned
                noteService.saveNote(note)
                    .then(note => {
                        const idx = notes.findIndex(note => note.id === noteId)
                        notes.splice(idx, 1)
                        notes.unshift(note)
                        setNotes(JSON.parse(JSON.stringify(notes)))
                    })
            })
    }

    return <section className="note-index">
        {isLoading && <h2>loading..</h2>}


        <div className="note-index-container flex">
            <NoteSideBar />
            <div className="note-list-container">
                {!isLoading && <NoteEdit onSaveNote={onSaveNote} />}
                <div className="note-lists-container">
                    <h2 className="list-name">Pinned</h2>
                    {!isLoading && <NoteList notes={notes.filter(note => note.isPinned)} onPinNoteChange={onPinNoteChange} onBgcolorChange={onBgcolorChange} onDuplicateNote={onDuplicateNote} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote} />}
                    <h2>Other</h2>
                    {!isLoading && <NoteList notes={notes.filter(note => !note.isPinned)} onPinNoteChange={onPinNoteChange} onBgcolorChange={onBgcolorChange} onDuplicateNote={onDuplicateNote} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote} />}
                </div>
            </div>
        </div>
    </section>

}
