
import { MailPreview } from './mail-preview.jsx'
import { MailCompose } from './mail-compose.jsx'
import { MailDetails } from './mail-details.jsx'
const { useEffect, useState, useRef } = React
const { Outlet, useParams } = ReactRouterDOM
const { Link } = ReactRouterDOM

export function MailList({ mails, onDeleteMail, onSendMail, onSaveMail }) {
    const { mailId, compose } = useParams()

//    console.log(useParams());
    return (<div>
        {!(mailId || compose)  && <ul className="mail-list clean-list">
            {mails.map(mail => <li key={mail.id} className="mail-preview">
                <MailPreview mail={mail} onSaveMail={onSaveMail} onDeleteMail={onDeleteMail} />

            </li>)}
        </ul>
            || (mailId && <MailDetails onDeleteMail={onDeleteMail}  /> || <MailCompose  onSendMail={onSendMail} />)}
    </div>)
}
