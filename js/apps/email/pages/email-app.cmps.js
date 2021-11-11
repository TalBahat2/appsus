import { emailService } from '../services/email-service.js'
import emailsList from '../cmps/emails-list.cmps.js'

export default {
    components: {
        emailsList
    },
    template: `
        <section class="email-app">
            <emails-list v-if="emails && emails.length" :emails="emails" />
            <div v-else>no emails to show</div>
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