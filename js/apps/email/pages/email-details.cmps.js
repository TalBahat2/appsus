import { emailService } from "../services/email-service.js";
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <section v-if="email" class="email-details">
            <div class="flex align-center">
                <h1 class="subject">{{email.subject}}</h1>
                <p class="labels">{{email.status}}</p>
            </div>
            <p class="sender">from: {{email.from}}</p>
            <hr>
            <p class="body">{{email.body}}</p>
            <button v-if="email.status !== 'trash'" @click="moveToTrash">Delete</button>
            <router-link v-else :to="'/email'" @click.native="remove">Delete permanently</router-link>
            <router-link :to="'/email'">
                <i class="fas fa-arrow-circle-left" title="back to emails"></i>
            </router-link>
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
        moveToTrash() {
            emailService.moveToTrash(this.email)
                .then(updatedEmail => this.email = updatedEmail)
            // TODO: pop a userMsg that email has been removed to trash
        },
        remove() {
            eventBus.$emit('deleteEmail', this.email.id)
        }
    }
}