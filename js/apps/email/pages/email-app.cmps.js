import { emailService } from '../services/email-service.js'
import emailsList from '../cmps/emails-list.cmps.js'
import emailsFilter from '../cmps/emails-filter.cmps.js'
import emailsFolderList from '../cmps/emails-folder-list.cmps.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    components: {
        emailsList,
        emailsFilter,
        emailsFolderList
    },
    template: `
        <section class="email-app">
            <emails-filter />
            <section class="flex">
                <emails-folder-list />
                <emails-list v-if="emails && emails.length" :emails="emailsToShow" />
                <div v-else>no emails to show</div>
            </section>
        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: null
        }
    },
    created() {
        emailService.query('emails')
            .then(emails => this.emails = emails);
        emailService.query('filter')
            .then(filter => this.filterBy = filter[0]);
        eventBus.$on('filtered', this.setFilter);
        eventBus.$on('changeStatus', this.changeStatus);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy.txt = filterBy.txt;
            this.filterBy.isRead = filterBy.isRead;
            this.filterBy.isStarred = filterBy.isStarred;
            this.filterBy.labels = filterBy.labels;
            emailService.save('filter', this.filterBy);
        },
        changeStatus(status) {
            this.filterBy.status = status;
            emailService.save('filter', this.filterBy);
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            var { status, txt, isRead, isStarred, labels } = this.filterBy;
            var emailsToShow = this.emails.filter(email => email.status === status)
            console.log('this.filterBy',this.filterBy);
            if (txt) {
                txt = txt.toLowerCase();
                emailsToShow = emailsToShow.filter(email =>
                    email.subject.toLowerCase().includes(txt)
                    || email.body.toLowerCase().includes(txt)
                    || email.from.toLowerCase().includes(txt)
                    || email.to.toLowerCase().includes(txt)
                )
            }
            if (isRead !== 'all') {
                emailsToShow = emailsToShow.filter(email =>
                    (email.isRead && isRead === 'read')
                    || (!email.isRead && isRead === 'unRead')
                )
            }
            // TODO: add filter by starred and by lables
            return emailsToShow;
        }
    },
}