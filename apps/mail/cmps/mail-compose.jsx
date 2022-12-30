
const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link, useLocation } = ReactRouterDOM

export function MailCompose({ onSendMail }) {

    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [to, setTo] = useState('')
    const navigate = useNavigate()
    const subjectRef = useRef('')
    const bodyRef = useRef('')
    const toRef = useRef('')
    const statusRef = useRef('draft')
    const params = useParams()
    console.log('params', params)

    useEffect(() => {
        const queryString = window.location.href.split('?')[1];
    const queryStringParams = new URLSearchParams(queryString);
        const noteSubject = queryStringParams.get('subject') || ''
        const noteBody = queryStringParams.get('body') || ''
        setSubject(noteSubject)
        setBody(noteBody)

        return () => {
        // save email as draft
        if (statusRef.current !== 'sent') onSendMail(toRef.current, bodyRef.current, subjectRef.current, 'draft')
    };
}, []);

function handleChange({ target }) {
    const { name, value } = target
    switch (name) {
        case 'subject':
            setSubject(value)
            subjectRef.current = value
            break;
        case 'body':
            setBody(value)
            bodyRef.current = value
            break;
        case 'to':
            setTo(value)
            toRef.current = value
            break;
    }

}

function handleMailSubmit(ev) {
    ev.preventDefault()
    statusRef.current = 'sent'
    onSendMail(subject, body, to, 'sent')
    navigate('/mail')
}



return <div className="mail-compose-container ">
    <form className="main-compose-form flex column" onSubmit={handleMailSubmit}>
        <div className="new-msg-hdr">New message</div>
        <button className="close-btn" onClick={() => navigate('/mail')}>X</button>
        <input className="recipients" name="to" type="email" id="recipients" placeholder="recipients" onChange={handleChange} />
        <label htmlFor="recipients" ></label>

        <input className="subject" name="subject" id="subject" placeholder="subject" value={subject} onChange={handleChange} />
        <label htmlFor="subject"></label>

        <textarea rows="10" cols="50" name="body" className="body" value ={body} onChange={handleChange} />
        <div className="send-btn"><button> Send</button></div>

    </form>

</div>


}