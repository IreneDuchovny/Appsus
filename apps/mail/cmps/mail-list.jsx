
import { MailPreview } from './mail-preview.jsx'
import { MailCompose } from './mail-compose.jsx'
import { MailDetails } from './mail-details.jsx'
const { useEffect, useState, useRef,Fragment } = React
const { Outlet, useParams } = ReactRouterDOM
const { Link } = ReactRouterDOM

export function MailList({ mails, onDeleteMail, onSendMail, onSaveMail }) {
    const { mailId, compose } = useParams()

//    console.log(useParams());
    return (<Fragment>
        <div className="list-preview-header flex row ">
        <img src="assets/img/mail-inbox-app.png" />
        <div className="list-preview-header-title">Primary</div>
    </div>
    <div>
        {!(mailId || compose)  && <ul className="mail-list clean-list">
            {mails.map(mail => <li key={mail.id} className="mail-preview">
                <MailPreview mail={mail} onSaveMail={onSaveMail} onDeleteMail={onDeleteMail} />

            </li>)}
        </ul>
            || (mailId && <MailDetails onDeleteMail={onDeleteMail}  /> || <MailCompose  onSendMail={onSendMail} />)}
    </div>
    </Fragment>)
}
