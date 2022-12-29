
const { useEffect, useState, useRef } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { loggedinUser } from '../../../services/login.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailHeader } from '../cmps/mail-header.jsx'
// import { MailFilter } from '../cmps/mail-filter.jsx'
// import { MailCompose } from '../cmps/mail-compose.jsx'



export function MailIndex() {

    const [isLoading, setIsLoading] = useState(true)
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        setIsLoading(true)
        mailService.query()
            .then(mails => {
                setIsLoading(false)
                setMails(mails)

                // console.log('mails',mails )
            })
    }
    function onDeleteMail(mailId) {
        setIsLoading(true)
        mailService.deleteMail(mailId)
            .then(() => {
                loadMails()
            })
    }

    function onSendMail(subject, body, to) {
        setIsLoading(true)
        mailService.sendMail(subject, body, to)
            .then(() => {

                loadMails()
            })
    }



    return <div>
        <MailHeader className="mail-header" />
        <div className="main-layout flex ">
            <div className="side-bar">
                <Link to="/mail/new/compose"> <button className="compose-btn">  Compose</button></Link>
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
                {isLoading ? <div>Loading...</div> : <MailList mails={mails}  onDeleteMail={onDeleteMail} onSendMail={onSendMail} />}
            </div>

        </div>
    </div>
}

