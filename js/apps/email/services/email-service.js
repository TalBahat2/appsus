import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js';

const EMAILS_KEY = 'emails'
_createEmails();

export const emailService = {
    query,
    getById,
    removeToTrash
}

function query() {
    return storageService.query(EMAILS_KEY);
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function removeToTrash(email) {
    email.status = 'trash';
    return storageService.put(EMAILS_KEY, email);
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
                status: 'sent',               
                to: 'puki@puki.com'
            }
        ]
    }
    utilService.saveToStorage(EMAILS_KEY, emails);
}