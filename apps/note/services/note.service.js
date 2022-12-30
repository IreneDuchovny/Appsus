import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from '../../../services/storage.service.js'
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    getNote,
    removeNote,
    saveNote,
    getEmptyNote,
    getDefaultFilter,
    updateBgcolor,
    getNotesForDisplay
}

function query(filterBy = getDefaultFilter()) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            if (filterBy.search) {
                console.log(filterBy.search)
                const regex = new RegExp(filterBy.search, 'i')
                notes = notes.filter(note => {
                    const isInTitle = regex.test(note.info.title)
                    const isIntxt = note.info.txt ? regex.test(note.info.txt) : false
                    const isInTodos = note.info.todos ? regex.test(note.info.todos.map(todo => todo.txt).join(',')) : false
                    return (
                        isInTitle || isIntxt || isInTodos
                    )
                })
            }
            return notes
        })
}

function getNotesForDisplay() {
    return query()
        .then(notes => {
            const pinnedNotes = notes.filter(note => note.isPinned)
            const unPinnedNotes = notes.filter(note => !note.isPinned)
            return pinnedNotes.concat(unPinnedNotes)

        })
}

function getNote(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
}

function removeNote(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function saveNote(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = '', isPinned = false) {
    const field = type === 'note-txt' ? 'txt' : 'url'
    return { type, isPinned, info: { title: '', [field]: '' }, style: { backgroundColor: 'white' } }
}

function updateBgcolor(noteId, bgcolor) {
    return getNote(noteId)
        .then(note => {
            note.style.backgroundColor = bgcolor
            return note
        })
}

function getDefaultFilter() {
    return { type: '', search: '' }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote('note-txt', 'My T', 'zoom meating on mondey', true))
        notes.push(_createNote('note-txt', 'your T', 'workout with momo', false))
        notes.push(_createNote('note-txt', 'our T', 'life is good', false))
        notes.push(_createNote('note-img', 'Image', 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Logo_Play_512px_clr_nGVTgYY.max-600x600.png', false))
        notes.push(_createNote('note-video', 'Video', 'https://www.youtube.com/embed/tgbNymZ7vqY', false))
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type, title, content, isPinned) {
    const field = type === 'note-txt' ? 'txt' : 'url'
    const note = getEmptyNote(type, isPinned)
    note.id = utilService.makeId()
    note.info.title = title
    note.info[field] = content
    return note
}