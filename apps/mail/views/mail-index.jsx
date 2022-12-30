
const { useEffect, useState, useRef } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Link , useParams} = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { loggedinUser } from '../../../services/login.service.js'
import { MailList } from '../cmps/mail-list.jsx'
// import { MailHeader } from '../cmps/mail-header.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
// import { MailFilter } from '../cmps/mail-filter.jsx'
// import { MailCompose } from '../cmps/mail-compose.jsx'



export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isLoading, setIsLoading] = useState(true)
    const [unreadCount, setUnreadCount] = useState(0)
    const [mails, setMails] = useState([])
    
    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        setIsLoading(true)
        mailService.query(filterBy)
            .then(mails => {
                setIsLoading(false)
                setMails(mails)
                getUnreadCount()

                // console.log('mails',mails )
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
                // console.log('moved to trash')
                mailService.saveMail(mail)
                    .then(() => {
                        loadMails()
                    }
                    )
            }
        })}
    


    function onSendMail(subject, body, to, status) {
                
                setIsLoading(true)
                mailService.sendMail(subject, body, to, status)
                    .then(() => {
                       
                            setFilterBy({"status" : "sent" })

                    })
            }

    function onSaveMail(mail) {
                mailService.saveMail(mail)
            }

    function onSetFilter(filterBy) {
                setFilterBy(filterBy)
            }


    function getUnreadCount() {
        mailService.unReadCount()
            .then(unreadCount => {
                setUnreadCount(unreadCount)
                console.log('unreadCount', unreadCount)
                return unreadCount
            })
            
    }        
    return <div>
            {/* <MailHeader className="mail-header" /> */}
            <div className="main-layout flex ">
                <div className="side-bar">
                    <Link to="/mail/new/compose"> <button className="compose-btn ">  Compose</button></Link>
                    {/* <button className="compose-btn"> <Route element={<MailCompose/>} path="/mail/compose"/> Compose</button> */}
                    <MailFolderList onSetFilter={onSetFilter} unreadCount={unreadCount} />

                </div>
                <div className="mail-list">
                    {/* todo:add tabs+paging in here */}
                    {isLoading ? <div>Loading...</div> : <MailList mails={mails} onSaveMail={onSaveMail} onDeleteMail={onDeleteMail} onSendMail={onSendMail} />}
                </div>

            </div>
        </div>
    }

