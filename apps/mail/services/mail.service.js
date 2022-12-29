// console.log('Hi')

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { loggedinUser } from '../../../services/login.service.js'

export const mailService = {
    query,
    getMailById,
    deleteMail,
    sendMail,
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
    var savedMails = storageService.loadFromStorage(MAIL_KEY)
    if (!savedMails || savedMails.length === 0) {
   
    const mails = [
        _createMail('Momo Tzur', 'Wassap?', 'Pick up!', 'momo@gmail.com'),
        _createMail('FrogyLift','Job interview', 'Hello from FrogyLift! we are excited to interview you...', 'frogyLift@frogy.com'),
        _createMail('Covid-19','Corona virus', 'Corona virus is a big problem, please stay home!', 'covid19@gmail.com'),
        _createMail('Nasa','SpaceX', 'SpaceX is going to launch a rocket soon!', 'nasa@nasa.com'),
        _createMail('Gmail','Welcome!', 'Welcome to Gmail! We hope you enjoy your stay!', 'gmailStaff@gmail.com'),
        _createMail('Bitcoin','Bitcoin', 'Bitcoin is a digital currency that is decentralized', 'bitcoin@digital.com'),
        _createMail('Amazon','Amazon Prime', 'Get Amazon Prime for only 10$ a month!', 'amazon-prime@aws.com')
    ]
    console.log('savedMails', savedMails);
    storageService.saveToStorage(MAIL_KEY, mails) } 
   
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

function sendMail( subject, body, to) {
    const mail = _createMail( loggedinUser.fullName, subject, body, to)
    return asyncStorageService.post(MAIL_KEY, mail).catch(err => {
        console.log('Mail not SENT', err);
    })
}