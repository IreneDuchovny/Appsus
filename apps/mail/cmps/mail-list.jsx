
import { MailPreview } from './mail-preview.jsx'
const { useEffect, useState, useRef } = React
const { Outlet,useParams } = ReactRouterDOM
const { Link } = ReactRouterDOM


export function MailList({ mails, onDeleteMail }) {
    const { mailId } = useParams()

    return (<div>
       {!mailId && <ul className="mail-list clean-list">
            {mails.map(mail => <li key={mail.id} className="mail-preview">
                <MailPreview mail={mail} onDeleteMail={onDeleteMail} />
               
            </li>)}
        </ul>
       || <Outlet />}
    </div>)
}
