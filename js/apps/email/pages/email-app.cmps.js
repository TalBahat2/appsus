import { emailService } from '../services/email-service.js'
import emailsList from '../pages/emails-list.cmps.js'
import emailsFilter from '../cmps/emails-filter.cmps.js'
import emailsFolderList from '../cmps/emails-folder-list.cmps.js'
import { eventBus } from '../../../services/event-bus-service.js'
import emailCompose from '../pages/email-compose.cmps.js'

export default {
    components: {
        emailsList,
        emailsFilter,
        emailsFolderList,
        emailCompose
    },
    template: `
        <section class="email-app">
            <emails-filter />
            <router-link class="composeBtn" to="/email/compose">Compose</router-link>
            <section class="flex folders-and-emails">
                <emails-folder-list />
                <emails-list :emails="emails" :status="filterBy.status" />
            </section>
        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: {
                status: 'inbox',
                txt: '',
                isRead: 'all',
                isStarred: 'all',
                labels: []
            }
        }
    },
    created() {
        emailService.query(this.filterBy)
            .then(emails => this.emails = emails);
        eventBus.$on('filter', this.filter);
        eventBus.$on('deleteEmail', this.deleteEmail); 
        eventBus.$on('saveEmail', this.saveEmail); 
        eventBus.$on('update', this.update);
    },
    methods: {
        filter(key, value) {
            this.filterBy[key] = value;
            emailService.query(this.filterBy)
                .then(emails => this.emails = emails)
        },
        deleteEmail(emailId) {
            emailService.deleteEmail(emailId);
        },
        saveEmail(email) {
            emailService.saveEmail(email);
        },
        update(email) {
            emailService.update(email);
        }
    },
}