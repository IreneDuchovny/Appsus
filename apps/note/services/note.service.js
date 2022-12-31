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
        notes = getDemoData()
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

function getDemoData() {
    return [
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: true,
            style: {
                backgroundColor: '#39F99F'
            },
            info: {
                title: 'Home Work',
                txt: 'Finish it by monday'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            style: {
                backgroundColor: '#E52A2A'
            },
            info: {
                title: 'My password',
                txt: '1234'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: true,
            style: {
                backgroundColor: '#00F0EC'
            },
            info: {
                title: 'Sunset',
                url: 'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: false,
            style: {
                backgroundColor: '#E6E141'
            },
            info: {
                title: 'My home',
                url: 'https://homesbyhowe.com.au/wp-content/uploads/2022/07/2668_hbh_dunnartthrosby_002-scaled.jpg'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-video',
            isPinned: false,
            style: {
                backgroundColor: '#0EB003'
            },
            info: {
                title: 'Good vibes',
                url: 'https://www.youtube.com/embed/3SeOVVJXOUo'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-todos',
            isPinned: true,
            style: {
                backgroundColor: '#DB72E9'
            },
            info: {
                title: 'Morning routine',
                todos:[
                    {
                        txt:'wake up',
                        isDone: true
                    },
                    {
                        txt:'Shower',
                        isDone: true
                    },
                    {
                        txt:'Drink coffe',
                        isDone: false
                    },
                    {
                        txt:'Codeee',
                        isDone: false
                    }
                ] 
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-todos',
            isPinned: false,
            style: {
                backgroundColor: '#F27373'
            },
            info: {
                title: 'Groceries',
                todos:[
                    {
                        txt:'milk',
                        isDone: false
                    },
                    {
                        txt:'bread',
                        isDone: false
                    },
                    {
                        txt:'meat',
                        isDone: false
                    },
                    {
                        txt:'onions',
                        isDone: false
                    },
                    {
                        txt:'chips',
                        isDone: false
                    },
                    {
                        txt:'gum',
                        isDone: false
                    },
                    {
                        txt:'cake',
                        isDone: false
                    }
                ] 
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: false,
            style: {
                backgroundColor: '#B553EA'
            },
            info: {
                title: 'Motivation',
                url: 'https://nationaltoday.com/wp-content/uploads/2021/10/Motivation-and-Inspiration-Day.jpg'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-video',
            isPinned: true,
            style: {
                backgroundColor: '#E66565'
            },
            info: {
                title: 'To watch later',
                url: 'https://www.youtube.com/embed/N775KsWQVkw'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-video',
            isPinned: true,
            style: {
                backgroundColor: '#5CB8FF'
            },
            info: {
                title: 'History',
                url: 'https://www.youtube.com/embed/ldjwAdWo0kA'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: true,
            style: {
                backgroundColor: '#F5EB7F'
            },
            info: {
                title: 'Grandmas recipe',
                txt: 'Ingredients: 2 1/4 cups Gold Medal™ all-purpose flour,1 teaspoon baking soda,1/2 teaspoon salt,1 cup butter, softened,3/4 cup granulated sugar,3/4 cup packed brown sugar,1 egg,1 teaspoon vanilla,2 cups semisweet chocolate chips,1 cup coarsely chopped nuts, if desired'
            }
        },
    ]
}