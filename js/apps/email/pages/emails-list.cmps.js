import emailPreview from '../cmps/email-preview.cmps.js'
import { emailService } from "../services/email-service.js";

export default {
    props: ['emails', 'status'],
    components: {
        emailPreview
    },
    template: `
        <ul class="emails-list">
            <h3 class="status flex justify-center">{{status}}</h3>
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