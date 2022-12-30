const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

export function NotePreview({ note }) {
    let content = note.type === 'note-txt' ? 'txt' : 'url'
    content = note.type === 'note-todos' ? 'todos' : content

    return <section className="note-preview">
        <h2>{note.info.title}</h2>
        <DynamicCmp content={note.info[content]} cmpType={note.type} note={note} />
    </section>
}

function DynamicCmp(props) {
    console.log(props.cmpType)
    switch (props.cmpType) {
        case 'note-txt':
            return <NoteTxt {...props} />
        case 'note-img':
            return <NoteImg {...props} />
        case 'note-video':
            return <NoteVideo {...props} />
        case 'note-todos':
            return <NoteTodos {...props} />
    }
}


function NoteTxt({ content }) {
    return <h3>{content}</h3>
}

function NoteImg({ content }) {
    return <img src={content} alt="" width='200px' />
}

function NoteVideo({ content }) {
    return (
        <iframe width="380" height="315" frameBorder="0" allowFullScreen
            src={content}>
        </iframe>
    )
}

function NoteTodos({ note }) {
    const [noteToUpdate, setNoteToUpdate] = useState(note)
    function handleChange({ target }) {
        let { name: idx} = target
        setNoteToUpdate(prevnoteToUpdate => {
            prevnoteToUpdate.info.todos[idx].isDone = !prevnoteToUpdate.info.todos[idx].isDone
            noteService.saveNote(prevnoteToUpdate)
            return JSON.parse(JSON.stringify(prevnoteToUpdate))
        })
    }

    return (
        <ul className="todos-list clean-list">
            {noteToUpdate.info.todos.map((todo, idx) => {
                const style = todo.isDone ? { textDecoration: 'line-through' } : {}
                return <li key={idx} style={style} >
                    <input type="checkbox"
                        name={idx}
                        checked={todo.isDone}
                        onChange={handleChange} />
                    {todo.txt}
                </li>
            })}
        </ul>
    )
}