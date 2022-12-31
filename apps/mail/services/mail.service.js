
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { loggedinUser } from '../../../services/login.service.js'

export const mailService = {
    query,
    getMailById,
    deleteMail,
    sendMail,
    saveMail,
    getDefaultFilter,
    unReadCount,
}
const MAIL_KEY = 'mailsDB'
_createMails()

//creates a mail
function _createMail(name, subject, body, to, status = 'inbox', isRead = false, isStarred = false) {
    return {
        id: utilService.makeId(),
        status: status,
        name: name,
        subject: subject,
        body: body,
        from: loggedinUser.email,
        to: to,
        isRead: isRead,
        isStarred: false,
        sentAt: Date.now(),
    }
}

//returns a promise with all mails
function query(filterBy = getDefaultFilter()) {

    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.search) {
                const regex = new RegExp(filterBy.search, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }
            if (filterBy.status) {
                mails = mails.filter(mail => mail.status === filterBy.status)
            }
            if (filterBy.sortBy) {
                mails = mails.sort((mail1, mail2) => {
                    if (mail1[filterBy.sortBy] < mail2[filterBy.sortBy]) return -1
                    if (mail1[filterBy.sortBy] > mail2[filterBy.sortBy]) return 1
                })
            }
            if (filterBy.isRead !== undefined) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (filterBy.isStarred !== undefined) {
                mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
            }
            return mails
        })
}

//creates mails if none exist
function _createMails() {
    var savedMails = storageService.loadFromStorage(MAIL_KEY)
    if (!savedMails || savedMails.length === 0) {

        const mails = [
            _createMail('Momo Tzur', 'Wassap?', 'Pick up!', 'momo@gmail.com'),
            _createMail('FrogyLift', 'Job interview', 'Hello from FrogyLift! we are excited to interview you...', 'frogyLift@frogy.com'),
            _createMail('Covid-19', 'Corona virus', 'Corona virus is a big problem, please stay home!', 'covid19@gmail.com'),
            _createMail('Nasa', 'SpaceX', 'SpaceX is going to launch a rocket soon!', 'nasa@nasa.com'),
            _createMail('Gmail', 'Welcome!', 'Welcome to Gmail! We hope you enjoy your stay!', 'gmailStaff@gmail.com'),
            _createMail('Bitcoin', 'Bitcoin', 'Bitcoin is a digital currency that is decentralized', 'bitcoin@digital.com'),
            _createMail('Amazon', 'Amazon Prime', 'Get Amazon Prime for only 10$ a month!', 'amazon-prime@aws.com'),
            _createMail('Acme Corp', 'Project update', 'Hello team, just a quick update on the [project name] project. We have made significant progress in the past week and are on track to meet our deadline. Please let me know if you have any questions or need any support. Thanks, [Your Name]', 'info@acmecorp.com'),
            _createMail('MegaCo', 'Invitation to webinar', 'Hi [name], you are invited to join us for a webinar on [topic] on [date] at [time]. The webinar will be hosted by [speaker] and will cover [agenda]. Please register for the webinar by clicking the link below. We hope to see you there! [webinar link]', 'webinars@megaco.com'),
            _createMail('XYZ Inc', 'Job offer', 'Congratulations [name]! We are pleased to offer you the position of [position] at XYZ Inc. The offer includes a salary of [salary] per year, with benefits including [benefits]. Please let us know if you accept the offer by [date]. We look forward to having you on the team!', 'jobs@xyzinc.com'),
            _createMail('ABC Company', 'Customer feedback', 'Hello [name], we appreciate your recent purchase from ABC Company and would love to hear your feedback. Please take a few minutes to complete the survey below. Your feedback helps us improve our products and services. Thank you for your business and for taking the time to provide feedback. [survey link]', 'customer.service@abc.com')
        ]
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

//returns a promise with the mail
function getMailById(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId).catch(err => {
        console.error('Mail not FOUND', err)
    })
}

//deletes a mail by id
function deleteMail(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId).catch(err => {
        console.error('Mail not REMOVED', err)
    })
}

function sendMail(subject, body, to, status) {
    const mail = _createMail(loggedinUser.fullName, subject, body, to, status, true)
    return asyncStorageService.post(MAIL_KEY, mail).catch(err => {
        console.error('Mail not SENT', err)
    })
}

//saved email after changes
function saveMail(mail) {
    return asyncStorageService.put(MAIL_KEY, mail).catch(err => {
        console.error('Mail not SAVED', err)
    })
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        search: '',
        sortBy: 'sentAt',
    }
}

function unReadCount() {
    return asyncStorageService.query(MAIL_KEY).then(mails => {
        mails = mails.filter(mail => mail.isRead === false)
        return mails.length
    })
}