
export function NoteBtns({noteId, onRemoveNote}){

    function removeNote(){
        onRemoveNote(noteId)
    }
    return <section className="note-btns">
        <button className="btn-remove-note" onClick = {removeNote}>X</button>
        <button className="btn-update-note">U</button>
    </section>
}