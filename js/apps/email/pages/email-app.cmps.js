import { emailService } from '../services/email-service.js'
import emailsList from '../cmps/emails-list.cmps.js'
import emailsFilter from '../cmps/emails-filter.cmps.js'
import emailsFolderList from '../cmps/emails-folder-list.cmps.js'

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
                <emails-list v-if="emails && emails.length" :emails="emails" />
                <div v-else>no emails to show</div>
            </section>
        </section>
    `,
    data() {
        return {
            emails: null
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails);

    }
}