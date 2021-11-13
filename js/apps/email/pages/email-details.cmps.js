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
            <hr>
            <div class="flex btns">
                <router-link :to="'/email'">
                    <i class="fas fa-arrow-circle-left" title="back to emails"></i>
                </router-link>
                <div v-if="email.status !== 'trash'" @click="moveToTrash">
                    <i class="fas fa-trash"></i>
                </div>
                <router-link v-else :to="'/email'" @click.native="remove">Delete permanently</router-link>
            </div>
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
            this.email.status = 'trash';
            emailService.update(this.email);
            if (this.email.status === 'trash') eventBus.$emit('showMsg', 'Email moved to trash!')            
        },
        remove() {
            eventBus.$emit('deleteEmail', this.email.id)
            eventBus.$emit('showMsg', 'Email deleted permanently!')
        }
    }
}