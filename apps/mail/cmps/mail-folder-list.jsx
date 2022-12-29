const { useEffect, useState, useRef } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Link, useNavigate } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'


export function MailFolderList({ onSetFilter }) {
    const nav = useNavigate()
    const [filterByFolder, setFilterByFolder] = useState(mailService.getDefaultFilter())
    const [selectedTab, setSelectedTab] = useState(1);
    const elInputRef = useRef(null)


    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    useEffect(() => {
        onSetFilter(filterByFolder)
    }, [filterByFolder])

    function handleClick(status) {
        setFilterByFolder(() => ({ 'status': status }))
        nav('/mail')
    }
    function handleUnread() {
        setFilterByFolder(() => ({ 'isRead': false, 'status': 'inbox' }))

        nav('/mail')
    }

    function handleStarred() {
        setFilterByFolder(() => ({ 'isStarred': true, 'status': 'inbox' }))
        nav('/mail')
    }

    return (
        <ul className="side-bar-list  clean-list">
            <div className="side-bar-inbox flex space-between">
                <img src="assets/img/mail-inbox-app.png" alt="" />
                <li className={selectedTab === 1 ? 'side-bar-item active' : 'side-bar-item'} onClick={() => {
                    handleClick('inbox')
                    setSelectedTab(1)
                }}>Inbox</li>
            </div>
            <div className="side-bar-starred flex space-between">
                <img src="assets/img/star.png" alt="" />
                <li className={selectedTab === 2 ? 'side-bar-item active' : 'side-bar-item'} onClick={() => {
                    handleStarred()
                    setSelectedTab(2)
                }}>Starred</li>
            </div>

            <div className="side-bar-sent flex space-between">
                <img src="assets/img/sent1.png" alt="" />
                <li className={selectedTab === 3 ? 'side-bar-item active' : 'side-bar-item'} onClick={() => {
                    handleClick('sent')
                    setSelectedTab(3)
                }}>Sent </li> </div>

            <div className="side-bar-drafts flex space-between">
                <img src="assets/img/draft.png" alt="" />
                <li className={selectedTab === 4 ? 'side-bar-item active' : 'side-bar-item'} onClick={() => {
                    setSelectedTab(4)
                }}>Drafts</li></div>

            <div className="side-bar-unread flex space-between">
                <img src="assets/img/open-envelope.png" alt="" />
                <li className={selectedTab === 5 ? 'side-bar-item active' : 'side-bar-item'} onClick={() => {
                    handleUnread()
                    setSelectedTab(5)
                }}>Unread</li></div>

            <div className="side-bar-trash flex space-between">
                <img src="assets/img/delete.png" alt="" />
                <li className={selectedTab === 6 ? 'side-bar-item active' : 'side-bar-item'} onClick={() => {
                    handleClick('trash')
                    setSelectedTab(6)
                }}>Trash</li></div>
        </ul>
    )
}
