const { Link } = ReactRouterDOM
const { useEffect, useState, useRef } = React
export function MailPreview({ mail }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    // const [isRead, setIsRead] = useState(mail.isRead)
    // const [isSent, setIsSent] = useState(mail.isSent)
    // const [isDraft, setIsDraft] = useState(mail.isDraft)
    // const [isTrash, setIsTrash] = useState(mail.isTrash)
    // const [isUnread, setIsUnread] = useState(mail.isUnread)


    return <div className="main-mail-preview flex space-between">
        {/* <input className="starred-checkbox fa-star-o" title="Starred email"  defaultChecked={isStarred ? 'cheched' : ''} /> */}
<div className="form-email">{mail.name}</div>
<div className="email-subject">{mail.subject} </div>
<div className="email-short-body">{mail.body}</div>
{/* create short body */}
<div className="email-date">{mail.sentAt}</div>








            {/* <input type="checkbox" id={mail.id} name="email-checkbox" value="email"/> */ }
    </div>

}
