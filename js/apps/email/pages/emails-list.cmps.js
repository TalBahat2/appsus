import emailPreview from '../cmps/email-preview.cmps.js'
import { emailService } from "../services/email-service.js";

export default {
    props: ['emails'],
    components: {
        emailPreview
    },
    template: `
        <ul class="emails-list">
            <email-preview v-for="email in emails" :email="email" :key="email.id" />
        </ul>
        
    `,
    data() {
        return {
        }
    },
    created() {
    }
}