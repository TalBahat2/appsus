import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <div class="email-compose">
            <h3>Compose An Email</h3>
            <input v-model="email.to" type="text" class="to" placeholder="to">
            <input v-model="email.subject" type="text" class="subject" placeholder="subject">
            <textarea v-model="email.body" cols="30" rows="10" class="body"></textarea>
            <router-link to="/email" @click.native="send">send</router-link>
            <router-link :to="'/email'">back to emails</router-link>
        </div>
    `,
    data() {
        return {
            email: {
                id: '',
                to: '',
                subject: '',
                body: '',
                sentAt: '',
                from: 'user@coding.com',
                status: 'draft',
                isRead: false
            }
        }
    },
    methods: {
        send() {
            this.email.status = 'sent';
            this.email.sentAt = Date.now();
            eventBus.$emit('sendEmail', this.email)
        }
    }

}