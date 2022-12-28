
const { Link } = ReactRouterDOM
const { useEffect, useState, useRef } = React

export function MailPreview({ mail, onDeleteMail }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    // const [isRead, setIsRead] = useState(mail.isRead)
    // const [isSent, setIsSent] = useState(mail.isSent)
    // const [isDraft, setIsDraft] = useState(mail.isDraft)
    // const [isTrash, setIsTrash] = useState(mail.isTrash)
    // const [isUnread, setIsUnread] = useState(mail.isUnread)

    const [isExpanded, setIsExpanded] = useState(false)


    return <div className="expend-prev flex column" >
        <div className="main-mail-preview flex row space-between" onClick={() => {
            setIsExpanded(!isExpanded)
        }}>
            {/* <input className="starred-checkbox fa-star-o" title="Starred email"  defaultChecked={isStarred ? 'cheched' : ''} /> */}
            <div className="from-email">{mail.name}</div>
            <div className="email-subject">{mail.subject}</div>
            <div className="email-short-body">{mail.body}</div>
            {/* create short body */}
            <div className="email-date">{mail.sentAt}</div>
        </div>

        <div className="expended-mail" hidden={!isExpanded}>
            <div className="expended-mail-btn flex row flex-end">
                <button className={isStarred ? "fa fa-star" : "fa fa-star-o"} title="Starred email" onClick={() => {
                    setIsStarred(!isStarred)
                    
                }}></button>
                <button className="fa fa-trash-o" title="Delete email" onClick={()=>onDeleteMail(mail.id)}></button>
                <Link to={`/mail/${mail.id}`}><button className="fa fa-expand" title="Expand"></button> </Link>
            </div>
            <h3 className="email-subject">{mail.subject} </h3>
            <p className="from-email">from: {mail.name} {`<${mail.to}>`}</p>
            <p className="to-email">To: me</p>
            <p className="email-body">{mail.body}</p>
        </div>
    </div>






    {/* <input type="checkbox" id={mail.id} name="email-checkbox" value="email"/> */ }


}
