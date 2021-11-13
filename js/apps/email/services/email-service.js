import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js';

const EMAILS_KEY = 'emails'
_createEmails();

export const emailService = {
    query,
    getById,
    moveToTrash,
    deleteEmail,
    sendEmail
}

function query(filterBy) {
    var allEmailsPromise = storageService.query(EMAILS_KEY);
    // if (!filterBy) return allEmailsPromise;
    var { status, txt, isRead, isStarred, labels } = filterBy;
    return allEmailsPromise.then(emails => {
        emails = emails.filter(email => email.status === status)
        if (txt) {
            txt = txt.toLowerCase();
            emails = emails.filter(email =>
                email.subject.toLowerCase().includes(txt)
                || email.body.toLowerCase().includes(txt)
                || email.from.toLowerCase().includes(txt)
                || email.to.toLowerCase().includes(txt)
            )
        }
        if (isRead !== 'all') {
            emails = emails.filter(email =>
                (email.isRead && isRead === 'read')
                || (!email.isRead && isRead === 'unRead')
                )
            }
        return emails;
        // TODO: add filter by starred and by lables
    })
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function moveToTrash(email) {
    email.status = 'trash';
    return storageService.put(EMAILS_KEY, email);
}

function deleteEmail(emailId) {
    return storageService.remove(EMAILS_KEY ,emailId);
}

function sendEmail(email) {
    storageService.post(EMAILS_KEY, email);
}

function _createEmails() {
    var emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                status: 'inbox',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                subject: 'Hi there!',
                body: 'Lets go to the beach',
                isRead: true,
                sentAt: 1551133930655,
                from: 'puki@puki.com',
                status: 'inbox',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'number3!',
                body: 'hello',
                isRead: true,
                sentAt: 1551134930655,
                from: 'user@appsus.com',
                status: 'inbox',
                to: 'puki@puki.com'
            },
            // {
            //     id: 'e104',
            //     subject: 'number3!',
            //     body: 'hello',
            //     isRead: true,
            //     sentAt: 1551134930655,
            //     from: 'user@appsus.com',
            //     status: 'inbox',
            //     to: 'puki@puki.com'
            // },

        ]
    }
    utilService.saveToStorage(EMAILS_KEY, emails);
}