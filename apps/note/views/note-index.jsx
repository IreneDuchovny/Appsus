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
        noteService.getNotesForDisplay()
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
        const isUpdate = note.id? true: false
        noteService.saveNote(note)
            .then(note=>{
                if(isUpdate){
                    const idx =notes.findIndex(currNote => currNote.id === note.id )
                    notes[idx] = note
                } else{
                    notes.unshift(note)
                }
                setNotes(JSON.parse(JSON.stringify(notes)))
            })
    }

    function onDuplicateNote(note){
        delete note.id
        onSaveNote(note)
    }

    function onBgcolorChange(noteId,bgcolor){
        noteService.updateBgcolor(noteId,bgcolor)
        .then(note=>{
            onSaveNote(note)
        })
    }

    function onPinNoteChange(noteId){
        noteService.getNote(noteId)
        .then(note=>{
            note.isPinned = !note.isPinned
            noteService.saveNote(note)
            .then(note=>{
                const idx = notes.findIndex(note=> note.id === noteId)
                notes.splice(idx,1)
                if(note.isPinned){
                    notes.unshift(note)
                } else{
                    notes.push(note)
                }
                setNotes(JSON.parse(JSON.stringify(notes)))
            })
        })
    }

    return <section className="note-index">
        {isLoading && <h2>loading..</h2>}
        {!isLoading && <NoteEdit onSaveNote={onSaveNote} />}
        {!isLoading && <NoteList notes={notes} onPinNoteChange={onPinNoteChange} onBgcolorChange={onBgcolorChange} onDuplicateNote={onDuplicateNote} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote} />}
    </section>

}
