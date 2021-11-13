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
            <section class="flex">
                <emails-folder-list />
                <emails-list v-if="emails && emails.length" :emails="emails" :status="filterBy.status" />
                <div v-else>no emails to show</div>
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
        eventBus.$on('sendEmail', this.sendEmail); 
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
        sendEmail(email) {
            emailService.sendEmail(email);
        }
    },
}