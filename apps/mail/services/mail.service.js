// console.log('Hi')

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { loggedinUser } from '../../../services/login.service.js'

export const mailService = {
    query,
    getMailById,
    deleteMail,
}
const MAIL_KEY = 'mailsDB'
_createMails()

//creates a mail
function _createMail(name, subject, body, to) {
    return {
        id: utilService.makeId(),
        name: name,
        subject: subject,
        body: body,
        from: loggedinUser.email,
        to: to,
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
    }
}

//returns a promise with all mails
//TODO: filterBy = getDefaultFilter()
//TODO: sortby
function query() {
    return asyncStorageService.query(MAIL_KEY)
}

//creates mails if none exist
function _createMails() {
    const mails = [
        _createMail('Momo Tzur', 'Wassap?', 'Pick up!', 'momo@gmail.com'),
        _createMail('FrogyLift','Job interview', 'Hello from FrogyLift! we are excited to interview you...', 'frogyLift@frogy.com'),
    ]
    var savedMails = storageService.loadFromStorage(MAIL_KEY)
    console.log('savedMails', savedMails);
   (savedMails.length === 0) ? storageService.saveToStorage(MAIL_KEY, mails) : ''
}

//returns a promise with the mail
function getMailById(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId).catch(err => {
        console.log('Mail not FOUND', err);
    })
}

//deletes a mail by id
function deleteMail(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId).catch(err => {
        console.log('Mail not REMOVED', err);
    })
}