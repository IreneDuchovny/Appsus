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
}

function query() {
    return asyncStorageService.query(NOTE_KEY)
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
    const field = type === 'note-txt'? 'txt':'url'
    return { type, isPinned, info: {title:'',[field]:''}, style: {} }
}

function getDefaultFilter() {
    return { txt: '', type: '' }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote('note-txt','My T','zoom meating on mondey', true))
        notes.push(_createNote('note-txt','your T','workout with momo', false))
        notes.push(_createNote('note-txt','our T', 'life is good', false))
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type,title,txt, isPinned) {
    const note = getEmptyNote(type, isPinned)
    note.id = utilService.makeId()
    note.info.title = title
    note.info.txt = txt
    return note
}