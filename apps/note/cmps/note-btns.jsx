
export function NoteBtns({ note, onRemoveNote, onEditing, onDuplicateNote, onBgcolorChange, onPinNoteChange }) {

    function removeNote() {
        onRemoveNote(note.id)
    }
    function bgColorChange({ target }) {
        onBgcolorChange(note.id, target.value)
    }
    return <section className="note-btns flex">
        <button className="btn-toggle-pin-note" onClick={()=>onPinNoteChange(note.id)}>P</button>
        <button className="btn-remove-note" onClick={removeNote}>X</button>
        <button className="btn-update-note" onClick={() => onEditing(note)}>U</button>
        <button className="btn-duplicate-note" onClick={() => onDuplicateNote(note)}>D</button>
        <input type="color" onChange={bgColorChange} />
    </section>
}