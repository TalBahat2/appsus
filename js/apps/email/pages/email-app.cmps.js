import { emailService } from '../services/email-service.js'
import emailPreview from '../cmps/email-preview.cmps.js'

export default {
    components: {
        emailPreview
    },
    template: `
        <section class="email-app">
            <ul v-if="emails && emails.length" class="emails-list">
                <email-preview v-for="email in emails" :email="email" :key="email.id"></email-preview>
            </ul>
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