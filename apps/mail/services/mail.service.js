// console.log('Hi')

import {utilService} from '../../../services/util.service.js'
import {storageService} from '../../../services/storage.service.js'
import {asyncStorageService} from '../../../services/async-storage.service.js'

export const mailService = {

}
const KEY = 'mailsDB'
_createMails()

    function _createMail(subject, body, to) {
        return {
            id: utilService.makeId(),
            subject: subject,
            body: body,
            to: to,
            isRead: false,
            sentAt: Date.now(),
        }
    }

    function _createMails() {
        const mails = [
            _createMail('Wassap?', 'Pick up!', 'momo@gmail.com'),
            _createMail('Job interview', 'Hello from FrogyLift! we are excited to interview you...','frogyLift@frogy.com'),
        ]
        var savedMails = storageService.loadFromStorage(KEY)
        savedMails || storageService.saveToStorage(KEY, mails)

    }