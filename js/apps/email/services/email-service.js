import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js';

const EMAILS_KEY = 'emails'
_createEmails();

export const emailService = {
    query,
    getById,
    moveToTrash,
    deleteEmail,
    saveEmail,
    update
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

function saveEmail(email) {
    storageService.post(EMAILS_KEY, email);
}

function update(email) {
    storageService.put(EMAILS_KEY, email)
}

function _createEmails() {
    var emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e101',
                subject: 'Matan Crispel shared "CaSep21-Materials" with you',
                body: 'Hi there, Matan Crispel (matan.cris@gmail.com) invited you to view the folder "CaSep21-Materials" on Dropbox.\n Enjoy!\n The Dropbox team',
                isRead: false,
                sentAt: 1551133930594,
                from: 'coding_academy@gmail.com',
                status: 'inbox',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                subject: 'New date for our meeting',
                body: 'Hi there, I would like to change our meeting date for Wednesday, is it work for you?',
                isRead: true,
                sentAt: 1551133930655,
                from: 'puki@gmail.com',
                status: 'inbox',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'New Account Details',
                body: 'Ta-da! You’ve joined your first Slack workspace and we couldn’t be more delighted. Here are your account details, along with some tips to help you get started.',
                isRead: true,
                sentAt: 1551999930655,
                from: 'slack@slack.com',
                status: 'inbox',
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                subject: 'Important update from YouTube API Services: Making the dislike count private',
                body: 'Dear YouTube API developer,\nWe would like to inform you of upcoming changes to YouTube that will impact the data available via the Data API starting December 13, 2021.\nOn November 10, YouTube will be making the public dislike count private. Users will still be able to dislike videos, and creators will still have access to the dislike counts for their own videos in YouTube Studio. Learn more about this change in our blog post.\nTo make the dislike count private across the platform, we also will be removing public access to the dislike count data via our API.',
                isRead: true,
                sentAt: 1551131010655,
                from: 'google_cloud@google.com',
                status: 'inbox',
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                subject: 'Updates from our project',
                body: 'Hi Roy, I have just Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, aliquid? Est veritatis eveniet, odit maiores sunt officiis consequuntur rem quo. Facere odio laudantium optio repellendus. Expedita maxime molestiae ullam? Nostrum.',
                isRead: true,
                sentAt: 1551131010655,
                from: 'user@appsus.com',
                status: 'sent',
                to: 'roygil@gmail.com'
            },
            {
                id: 'e106',
                subject: 'פתיחת הרשמה לסמסטר אביב תשפ"ב',
                body: 'שלום רב, היום נפתחה ההרשמה לסמסטר אביב תשפ"ב. המידע המלא מופיע באתר ההרשמה',
                isRead: true,
                sentAt: 1551771010655,
                from: 'open_university@google.com',
                status: 'inbox',
                to: 'user@appsus.com'
            },
            {
                id: 'e107',
                subject: 'About the last payment',
                body: 'Hi Valery, please contact me about toe final payment. \n yours, \n Tal',
                isRead: true,
                sentAt: 1551771010655,
                from: 'user@appsus.com',
                status: 'sent',
                to: 'valery@gmail.com'
            },
        ]
    }
    utilService.saveToStorage(EMAILS_KEY, emails);
}