


export function NotePreview({ note }) {
    const content = note.type === 'note-txt' ? 'txt' : 'url'

    return <section className="note-preview">
        <h2>{note.info.title}</h2>
        <DynamicCmp content={note.info[content]} cmpType={note.type} />
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
    }
}


function NoteTxt({ content }) {
    return <h3>{content}</h3>
}

function NoteImg({ content }) {
    return <img src={content} alt="" width='200px'/>
}

function NoteVideo({ content }) {
    return (
        <iframe width="380" height="315" frameborder="0" allowfullscreen 
            src={content}>
        </iframe>
    )
}