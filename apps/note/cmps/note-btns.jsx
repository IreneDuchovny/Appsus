
export function NoteBtns({ note, onRemoveNote, onEditing, onDuplicateNote, onBgcolorChange, onPinNoteChange }) {

    function removeNote() {
        onRemoveNote(note.id)
    }
    function bgColorChange({ target }) {
        onBgcolorChange(note.id, target.value)
    }
    
    return <section className="note-btns flex">
        <button style={note.style} className="btn-toggle-pin-note" onClick={()=>onPinNoteChange(note.id)}><i className="fa-solid fa-thumbtack"></i></button>
        <button style={note.style} className="btn-remove-note" onClick={removeNote}><i className="fa-regular fa-trash-can"></i></button>
        <button style={note.style} className="btn-update-note" onClick={() => onEditing(note)}><i className="fa-regular fa-pen-to-square"></i></button>
        <button style={note.style} className="btn-duplicate-note" onClick={() => onDuplicateNote(note)}><i className="fa-solid fa-copy"></i></button>
        <label style={note.style}> <i className="fa-solid fa-palette"></i><input type="color" onChange={bgColorChange} /></label>
    </section>
}