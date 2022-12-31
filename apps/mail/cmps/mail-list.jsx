
import { MailPreview } from './mail-preview.jsx'
import { MailCompose } from './mail-compose.jsx'
import { MailDetails } from './mail-details.jsx'
const { Fragment } = React
const { useParams } = ReactRouterDOM

export function MailList({ mails, onDeleteMail, onSendMail, onSaveMail, getUnreadCount, setFilterBy }) {
    const { mailId, compose } = useParams()

    function handleSortChange({ target }) {
        const { value } = target
        setFilterBy((prevFilterBy) => { return { ...prevFilterBy, sortBy: value } })
    }
    function getEmailList() {
        var emailShow = mails.map(mail => <li key={mail.id} className="mail-preview">
            <MailPreview mail={mail} getUnreadCount={getUnreadCount} onSaveMail={onSaveMail} onDeleteMail={onDeleteMail} />
        </li>)

        if (emailShow.length === 0) return <div className="no-mail">No e-mails to show</div>
        return emailShow
    }

    return (<Fragment>
        {!(mailId || compose) && <div className="list-preview-header flex row ">
            <img src="assets/img/mail-inbox-app.png" />
            <div className="list-preview-header-title">Primary</div>

            <select id="sort-by" className="sort-by-select" placeholder="sort by" onChange={handleSortChange}>
                <option disabled label="Sort by" selected></option>
                <option value="sentAt">Sent at</option>
                <option value="subject">Subject</option>
            </select>
        </div>}
        <div>
            {!(mailId || compose) && <ul className="mail-list clean-list">
                {getEmailList()}
            </ul>
                || (mailId && <MailDetails onDeleteMail={onDeleteMail} /> || <MailCompose onSendMail={onSendMail} />)}
        </div>
    </Fragment>)
}
