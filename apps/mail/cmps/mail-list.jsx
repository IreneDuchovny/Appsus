
import { MailPreview } from './mail-preview.jsx'
const { useEffect, useState, useRef } = React
const { Link } = ReactRouterDOM

export function MailList({ mails }) {

    return <div>
        <ul className="mail-list clean-list">
            {mails.map(mail => <li key={mail.id} className="mail-preview">
                <MailPreview mail={mail} />
                <hr />
            </li>)}
        </ul>
    </div>
}
