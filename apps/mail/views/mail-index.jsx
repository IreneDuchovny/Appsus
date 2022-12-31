
const { useEffect, useState, useRef } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { eventBusService } from '../../../services/event-bus.service.js'

export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isLoading, setIsLoading] = useState(true)
    const [unreadCount, setUnreadCount] = useState(0)
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [filterBy])

    useEffect(() => {
        const unsubscribe = eventBusService.on('search', (search) => {
            setFilterBy((prevFilterBy) => { return { ...prevFilterBy, search: search } })
        })
        return unsubscribe
    }, [])

    function loadMails() {
        setIsLoading(true)
        mailService.query(filterBy)
            .then(mails => {
                setIsLoading(false)
                setMails(mails)
                getUnreadCount()
            })
    }
    function onDeleteMail(mailId) {
        setIsLoading(true)
        mailService.getMailById(mailId).then(mail => {
            if (mail.status === 'trash') {
                mailService.deleteMail(mailId)
                    .then(() => {
                        loadMails()
                    })
            } else {
                mail.status = 'trash'
                mailService.saveMail(mail)
                    .then(() => {
                        loadMails()
                    }
                    )
            }
        })
    }



    function onSendMail(subject, body, to, status) {

        setIsLoading(true)
        mailService.sendMail(subject, body, to, status)
            .then(() => {

                setFilterBy({ "status": "sent" })

            })
    }

    function onSaveMail(mail) {
        return mailService.saveMail(mail)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    function getUnreadCount() {
        mailService.unReadCount()
            .then(unreadCount => {
                setUnreadCount(unreadCount)
                return unreadCount
            })
    }
    return <div>
        <div className="main-layout flex ">
            <div className="side-bar">
                <Link to="/mail/new/compose"> <button className="compose-btn ">  Compose</button></Link>
                <MailFolderList onSetFilter={onSetFilter} unreadCount={unreadCount} />
            </div>
            <div className="mail-list">
                {isLoading ? <div>Loading...</div> : <MailList setFilterBy={setFilterBy} getUnreadCount={getUnreadCount} mails={mails} onSaveMail={onSaveMail} onDeleteMail={onDeleteMail} onSendMail={onSendMail} />}
            </div>
        </div>
    </div>
}

