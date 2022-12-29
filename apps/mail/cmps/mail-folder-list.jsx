const { useEffect, useState, useRef } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Link, useNavigate } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'


export function MailFolderList({ onSetFilter }) {
    const nav = useNavigate()
    const [filterByFolder, setFilterByFolder] = useState(mailService.getDefaultFilter())
    const elInputRef = useRef(null)


    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    useEffect(() => {
        onSetFilter(filterByFolder)
    }, [filterByFolder])

    function handleClick(tab) {

        setFilterByFolder((prevFilter) => ({ ...prevFilter, 'status': tab }))
        nav('/mail')
    }


    return (
        <ul className="side-bar-list  clean-list">
            <li className="side-bar-item" onClick={() => handleClick('inbox')}>Inbox</li>
            <li className="side-bar-item ">Starred</li>
            <li className="side-bar-item" onClick={() => handleClick('sent')}>Sent </li>
            <li className="side-bar-item">Drafts</li>
            <li className="side-bar-item">Unread</li>
            <li className="side-bar-item">Trash</li>
        </ul>
    )
}