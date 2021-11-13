import { eventBus } from '../../../services/event-bus-service.js'
import {emailService} from '../services/email-service.js'

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
                <div class="btns flex">
                    <router-link class="back" :to="'/email'">
                        <i class="fas fa-arrow-circle-left" title="back to emails"></i>
                    </router-link>
                    <router-link class="send" to="/email" @click.native="send">                    
                        <i class="far fa-paper-plane" title="send"></i>
                    </router-link>
                    <router-link class="save" to="/email" @click.native="saveDraft">                    
                        <i class="fas fa-save" title="save to draft"></i>
                    </router-link>
                </div>
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
                isRead: true
            },
            saveDraftInterval: null
        }
    },
    created() {
        const { emailId } = this.$route.params;
        if(emailId) emailService.getById(emailId)
            .then(email => this.email = email);
        this.email.sentAt = Date.now();
        this.addDraft(this.email);
        this.saveDraftInterval = setInterval(()=> {
            this.updateDraft(this.email);
        }, 5000)
    },
    mounted() {
    },
    destroyed() {
        clearInterval(this.saveDraftInterval);
    },
    methods: {
        send() {
            this.email.status = 'sent';
            this.email.isRead = true;
            this.email.sentAt = Date.now();
            eventBus.$emit('update', this.email)
            eventBus.$emit('showMsg', 'email has been sent!');
            clearInterval(this.saveDraftInterval);
        },
        addDraft() {
            eventBus.$emit('saveEmail', this.email);
        },
        updateDraft() {
            eventBus.$emit('update', this.email);
        },
        saveDraft() {
            eventBus.$emit('update', this.email);
            eventBus.$emit('showMsg', 'email saved to drafts!');
        }
    }

}