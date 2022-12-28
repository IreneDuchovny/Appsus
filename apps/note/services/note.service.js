import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from '../../../services/storage.service.js'
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'

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
    return { type, isPinned, info: {}, style: {} }
}

function getDefaultFilter() {
    return { txt: '', type: '' }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.unshift(_createNote('note-txt', true))
        notes.unshift(_createNote('note-txt', false))
        notes.unshift(_createNote('note-txt', false))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type, isPinned) {
    const note = getEmptyNote(type, isPinned)
    note.id = utilService.makeId()
    note.info.txt = utilService.makeLorem(10)
}