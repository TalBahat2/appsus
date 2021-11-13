import emailPreview from '../cmps/email-preview.cmps.js'
import { emailService } from "../services/email-service.js";

export default {
    props: ['emails', 'status'],
    components: {
        emailPreview
    },
    template: `
        <table class="emails-list grow-1">
            <tr>
                <td class="status" colspan="4">{{status}}</td>
            </tr>
            <email-preview v-if="emails && emails.length" v-for="email in emails" :email="email" :key="email.id" />
        </table>
        
    `,
    data() {
        return {
        }
    },
    created() {
    }
}