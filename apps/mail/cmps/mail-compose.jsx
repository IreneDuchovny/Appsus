
const { useState, useEffect } = React
const { useNavigate, useParams, Link, useLocation } = ReactRouterDOM


export function MailCompose({onSendMail}) {



    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [to, setTo] = useState('')
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name, value } = target
        switch (name) {
            case 'subject':
                setSubject(value)
                break;
            case 'body':
                setBody(value)
                break;
            case 'to':
                setTo(value)
                break;
        }
    }

    function handleMailSubmit(ev) {
        ev.preventDefault()
        onSendMail(subject, body, to)
        navigate('/mail')
  
        
    }

    return <div className="mail-compose-container ">
        <form className="main-compose-form flex column" onSubmit={handleMailSubmit}>
            <div className="new-msg-hdr">New message</div>

            <input className="recipients" name="to" type="email" id="recipients" placeholder="recipients" onChange={handleChange} />
            <label htmlFor="recipients" >To</label>

            <input className="subject" name="subject" id="subject" placeholder="subject" onChange={handleChange} />
            <label htmlFor="subject"></label>

            <textarea rows="10" cols="50" name="body" className="body" onChange={handleChange} />
            <div className="send-btn"><button> Send</button></div>

        </form>

    </div>


}