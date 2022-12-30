
const { Link } = ReactRouterDOM
const { useEffect, useState, useRef,Fragment } = React
import { Longtxt } from '/long-txt.jsx'

export function MailPreview({ mail, onDeleteMail, onSaveMail }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)

    const [isRead, setIsRead] = useState(mail.isRead)
    // const [isSent, setIsSent] = useState(mail.isSent)
    // const [isDraft, setIsDraft] = useState(mail.isDraft)
    // const [isTrash, setIsTrash] = useState(mail.isTrash)
    // const [isUnread, setIsUnread] = useState(mail.isUnread)

    const [isExpanded, setIsExpanded] = useState(false)

    function onClickMail() {
        setIsExpanded(!isExpanded)
        setIsRead(true)
        mail.isRead = true
        onSaveMail(mail)
    }

    function onStarMail() {
        setIsStarred(!isStarred)
        mail.isStarred = !isStarred
        onSaveMail(mail)
    }
    function formatDate(timestamp) {
        const date = new Date(timestamp);

        const options = {
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
        };

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        return formattedDate

    }

    return <div className="expend-prev flex column" >

        <div className={isRead ? "main-mail-preview flex row " : "main-mail-preview flex row space-between unread"} onClick={() => {
            onClickMail()
        }}>
           
            {/* <input className="starred-checkbox fa-star-o" title="Starred email"  defaultChecked={isStarred ? 'cheched' : ''} /> */}
            <button className={isStarred ? "fa fa-star starred-checkbox" : "fa fa-star-o starred-checkbox"} title="Starred email" onClick={() => {
                onStarMail()
            }}></button>
            <div className="from-email">{mail.name} </div>
            <div className="email-subject">{mail.subject}</div>
            {/* <div className="email-short-body"><Longtxt txt={mail.body || ""} length={20} /></div> */}

            <div className="email-short-body">{mail.body}</div>
            {/* create short body */}
            <div className="email-date">{formatDate(mail.sentAt)}</div>
        </div>

        {/* //expended section */}
        <div className="expended-mail" hidden={!isExpanded}>
            <div className="expended-mail-btn flex row flex-end">
                <button className={isStarred ? "fa fa-star star-btn" : "fa fa-star-o star-btn"} title="Starred email" onClick={() => {
                    onStarMail()

                }}></button>
                <button className="fa fa-trash-o trash-btn" title="Delete email" onClick={() => onDeleteMail(mail.id)}></button>
                <Link to={`/mail/${mail.id}`}><button className="fa fa-expand expant-btn" title="Expand"></button> </Link>
            </div>
            <div className="expended-mail-content flex row">
            <div className="main-pereview-expended ">
            <img  className= "list-sender-image" src="assets/img/user.png" /></div>
            <div className="expended-mail-content">
            <h3 className="email-subject">{mail.subject} </h3>
            <p className="from-email">from: {mail.name} {`<${mail.to}>`}</p>
            <p className="to-email">To: me</p>
            <p className="email-body">{mail.body}</p></div>
            </div>
        </div>
    </div>
    

//   <div className="list-preview-header flex column ">
//            <img src="assets/img/mail-inbox.png" />
//            <div className="primary">Primary</div>
//        </div>




    {/* <input type="checkbox" id={mail.id} name="email-checkbox" value="email"/> */ }


}
