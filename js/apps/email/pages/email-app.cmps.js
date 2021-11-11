import { emailService } from '../services/email-service.js'
import emailsList from '../cmps/emails-list.cmps.js'
import emailsFilter from '../cmps/emails-filter.cmps.js'
import emailsFolderList from '../cmps/emails-folder-list.cmps.js'
import { eventBus } from '../../../services/event-bus-service.js'
// import emailCompose from '../cmps/email-compose.cmps.js'

export default {
    components: {
        emailsList,
        emailsFilter,
        emailsFolderList,
        // emailCompose
    },
    template: `
        <section class="email-app">
            <emails-filter />
            <section class="flex">
                <emails-folder-list />
                <!-- <email-compose /> -->
                <!-- {{emails}} -->
                <emails-list v-if="emails && emails.length" :emails="emails" />
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
    },
    methods: {
        filter(key, value) {
            this.filterBy[key] = value;
            emailService.query(this.filterBy)
                .then(emails => this.emails = emails)
        },
        deleteEmail(emailId) {
            emailService.deleteEmail(emailId);
        }
    },
    computed: {
    },
}