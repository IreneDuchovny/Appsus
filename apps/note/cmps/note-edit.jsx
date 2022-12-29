const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

export function NoteEdit({ onSaveNote, noteToEdit, endEditing }) {
    const [noteType, setNoteType] = useState('txt')
    const [note, setNote] = useState(noteService.getEmptyNote(noteType))
    const [isExpended, setIsExpended] = useState(false)
    const placeHolderRef = useRef('Take a note...')
    const fieldRef = useRef('txt')

    useEffect(() => {
        if (noteToEdit) {
            setNote(noteToEdit)
            onNoteTypeChange(noteToEdit.type)
            setIsExpended(true)
        }
    }, [])

    function handleChange({ target }) {
        let { name: field, value } = target
        setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function saveNote(ev) {
        ev.preventDefault()
        if (note.type === 'note-video') checkVideoUrl()
        onSaveNote(note)
        setIsExpended(false)
        setNote(noteService.getEmptyNote(noteType))
        endEditing()
    }

    function checkVideoUrl() {
        note.info.url = note.info.url.replace('watch?v=', 'embed/')
    }

    function onNoteTypeChange(newNoteType) {
        switch (newNoteType) {
            case 'note-txt':
                placeHolderRef.current = 'Take a note...'
                fieldRef.current = 'txt'
                break;
            case 'note-img':
                placeHolderRef.current = 'Enter image URL...'
                fieldRef.current = 'url'
                break;
            case 'note-video':
                placeHolderRef.current = 'Enter video URL...'
                fieldRef.current = 'url'
                break;
        }
        setNoteType(newNoteType)
        if(!noteToEdit) setNote(noteService.getEmptyNote(newNoteType))
    }

    function onClose() {
        if (noteToEdit) {
            endEditing()
        } else {
            setIsExpended(false)
        }
    }

    return (
        <section className="note-edit flex justify-center align-center">
            <form onSubmit={saveNote}>

                {isExpended && <input type="text"
                    name='title'
                    placeholder='Enter Title'
                    value={note.info.title}
                    onChange={handleChange}
                />}
                <label htmlFor="">
                    <input
                        onClick={() => setIsExpended(true)}
                        type="text"
                        name={fieldRef.current}
                        placeholder={placeHolderRef.current}
                        value={note.info[fieldRef.current]}
                        onChange={handleChange} />
                    {!noteToEdit && <section className="note-edit-btns flex space-between">
                        <button type="button" onClick={() => onNoteTypeChange('note-txt')}>T</button>
                        <button type="button" onClick={() => onNoteTypeChange('note-img')}>I</button>
                        <button type="button" onClick={() => onNoteTypeChange('note-video')}>V</button>
                    </section>}
                </label>
                <button type='submit' hidden={true}></button>
                {isExpended && <button className='btn-close' type="button" onClick={onClose}>Close</button>}

            </form>
        </section>
    )
}