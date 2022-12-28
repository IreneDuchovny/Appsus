
const { useEffect, useState, useRef } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import {loggedinUser} from '../../../services/login.service.js'
import {MailHeader} from '../cmps/mail-header.jsx'
// import { MailFilter } from '../cmps/mail-filter.jsx'
// import { MailCompose } from '../cmps/mail-compose.jsx'
// import { MailDetails } from '../cmps/mail-details.jsx'


export function MailIndex() {

const [mails, setMails] = useState([])

useEffect(() => {
    loadMails()
}, [])

function loadMails() {
    mailService.query()
        .then(mails => {
            setMails(mails)
            // console.log('mails',mails )
        })
}


    return <div>
<MailHeader className="mail-header"/>
<div className="main-layout flex space-between">
<div className="side-bar">
    <button className="compose-btn">Compose</button>
    <ul className="side-bar-list clean-list">
        <li className="side-bar-item">Inbox</li>
        <li className="side-bar-item">Starred</li>
        <li className="side-bar-item">Sent </li>
        <li className="side-bar-item">Drafts</li>
        <li className="side-bar-item">Unread</li>
        <li className="side-bar-item">Trash</li>
    </ul>
</div>
<div className="mail-list">
    {/* todo:add tabs+paging in here */}
    <MailList mails= {mails} />
</div>

</div>



    </div>
}

