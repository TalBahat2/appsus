import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
        <div class="email-compose">
            <div class="header">New Email</div>
            <form class="flex direction-column">
                <label>
                    <input v-model="email.to" type="text" class="to" placeholder="to">
                </label>
                <label>
                    <input v-model="email.subject" type="text" class="subject" placeholder="subject">
                </label>
                <textarea v-model="email.body" cols="30" rows="10" class="body"></textarea>
                <router-link class="send" to="/email" @click.native="send">                    
                        <i class="far fa-paper-plane" title="send"></i>
                </router-link>
                <router-link :to="'/email'">
                    <i class="fas fa-arrow-circle-left" title="back to emails"></i>
                </router-link>
            </form>
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