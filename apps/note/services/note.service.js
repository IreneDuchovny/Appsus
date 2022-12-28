import { asyncStorageService } from "../../../services/async-storage.service.js"
import {storageService} from '../../../services/storage.service.js'
import { utilService } from "../../../services/util.service.js"

const NOTE_KRY = 'noteDB'

function query() {
    return asyncStorageService.query(NOTE_KRY)
}

function getNote(noteId) {
    return asyncStorageService.get(NOTE_KRY, noteId)
}

function removeNote(noteId) {
    return asyncStorageService.remove(NOTE_KRY, noteId)
}

function saveNote(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KRY, note)
    } else {
        return asyncStorageService.post(NOTE_KRY, note)
    }
}

function getEmptyNote(type='',isPinned = false) {
    return { type,isPinned, info:{},style:{} }
  }
  
  function getDefaultFilter() {
    return { txt: '', type: '' }
  }