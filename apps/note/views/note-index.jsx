const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

import { NoteList } from "../cmps/note-list.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [isLoaded,setIsLoaded] =useState(false)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notesToUpdate =>{
                setNotes(notesToUpdate)
                setIsLoaded(true)
            })
    }

    function onRemoveNote(noteId){
        noteService.removeNote(noteId)
        .then(()=>{
            const notesToUpdate = notes.filter(note=> note.id !== noteId)
            setNotes(notesToUpdate)
        })
    }

    return <section className="note-index">
        {!isLoaded && <h2>loading..</h2>}
        {isLoaded && <NoteList notes = {notes} onRemoveNote={onRemoveNote} />}
    </section>

}
