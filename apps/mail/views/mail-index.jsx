
const { useEffect, useState, useRef } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import {loggedinUser} from '../../../services/login.service.js'
import {MailHeader} from '../cmps/mail-header.jsx'
// import { MailFilter } from '../cmps/mail-filter.jsx'
// import { MailCompose } from '../cmps/mail-compose.jsx'



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
 function onDeleteMail(mailId){
    mailService.deleteMail(mailId)
    .then(() => {
        loadMails()
    })
 }

    return <div>
<MailHeader className="mail-header"/>
<div className="main-layout flex ">
<div className="side-bar">
    <button className="compose-btn"> <Link to="/mail/compose"> Compose</Link></button>
    {/* <button className="compose-btn"> <Route element={<MailCompose/>} path="/mail/compose"/> Compose</button> */}

    <ul className="side-bar-list  clean-list">
        <li className="side-bar-item">Inbox</li>
        <li className="side-bar-item ">Starred</li>
        <li className="side-bar-item">Sent </li>
        <li className="side-bar-item">Drafts</li>
        <li className="side-bar-item">Unread</li>
        <li className="side-bar-item">Trash</li>
    </ul>
</div>
<div className="mail-list">
    {/* todo:add tabs+paging in here */}
    <MailList mails= {mails}  onDeleteMail={onDeleteMail}/>
</div>

</div>



    </div>
}

