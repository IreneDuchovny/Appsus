
const { Link, useNavigate } = ReactRouterDOM
const { useEffect, useState, useRef, Fragment } = React
import { LongTxt } from '/long-txt.jsx'

export function MailPreview({ mail, onDeleteMail, onSaveMail, getUnreadCount }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const navigate = useNavigate()
    const [isRead, setIsRead] = useState(mail.isRead)
    const [isExpanded, setIsExpanded] = useState(false)

    function onClickMail() {
        setIsExpanded(!isExpanded)
        setIsRead(true)
        mail.isRead = true
        onSaveMail(mail).then(() => {
            getUnreadCount()
        })
    }

    function onStarMail() {
        setIsStarred(!isStarred)
        mail.isStarred = !isStarred
        onSaveMail(mail)
    }
    function formatDate(timestamp) {
        const date = new Date(timestamp)

        const options = {
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
        }
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
        return formattedDate
    }

    function handleNoteSend() {
        const queryStringParams = `?title=${mail.subject}&txt=${mail.body}`
        const newUrl = '../' + '/note' + queryStringParams
        navigate(newUrl)
    }

    return <div className="expend-prev flex column" >
        <div className={isRead ? "main-mail-preview flex row " : "main-mail-preview  flex row unread"} onClick={() => {
            onClickMail()
        }}>
            <div className={isStarred ? "starred-checkbox fa fa-star " : "starred-checkbox fa fa-star-o "} title="Starred email" onClick={() => {
                onStarMail()
            }}></div>
            <div className=" from-email">{mail.name} </div>
            <div className=" email-subject">{mail.subject}</div>
            <div className=" email-short-body"><LongTxt txt={mail.body || ''} length={40} /></div>
            <div className=" email-date">{formatDate(mail.sentAt)}</div>
        </div>

        {/* //expended section */}
        <div className="expended-mail" hidden={!isExpanded}>
            <div className="expended-mail-btn flex row flex-end">
                <button className="fa-solid fa-paper-plane note-btn" onClick={handleNoteSend}></button>
                <button className={isStarred ? "fa fa-star star-btn" : "fa fa-star-o star-btn"} title="Starred email" onClick={() => {
                    onStarMail()
                }}></button>
                <button className="fa fa-trash-o trash-btn" title="Delete email" onClick={() => onDeleteMail(mail.id)}></button>
                <Link to={`/mail/${mail.id}`}><button className="fa fa-expand expant-btn" title="Expand"></button> </Link>
            </div>
            <div className="expended-mail-content flex row">
                <div className="main-pereview-expended ">
                    <img className="list-sender-image" src="assets/img/user.png" /></div>
                <div className="expended-mail-content">
                    <h3 className="email-subject">{mail.subject} </h3>
                    <p className="from-email">from: {mail.name} {`<${mail.to}>`}</p>
                    <p className="to-email">To: me</p>
                    <p className="email-body">{mail.body}</p></div>
            </div>
        </div>
    </div>
}
