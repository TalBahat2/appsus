import { emailService } from "../services/email-service.js";

export default {
    template: `
        <section v-if="email" class="email-details">
            <h3>{{email.subject}}</h3>
            <p class="body">{{email.body}}</p>
            <p class="sender">{{email.from}}</p>
            <p class="status">{{email.status}}</p>
            <button @click="removeToTrash">Delete</button>
            <router-link :to="'/email'">back to emails</router-link>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        const { emailId } = this.$route.params;
        emailService.getById(emailId)
            .then(email => this.email = email);
    },
    methods: {
        removeToTrash() {
            if (this.email.status !== 'trash') {
                emailService.removeToTrash(this.email)
                    .then(updatedEmail => this.email = updatedEmail)
                // TODO: pop a userMsg that email has been removed to trash
            } else {
                // delete forever
                // move to inbox
            }
        }
    }
}