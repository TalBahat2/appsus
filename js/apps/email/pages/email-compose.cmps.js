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
                <div class="btns flex">
                    <router-link class="back" :to="'/email'">
                        <i class="fas fa-arrow-circle-left" title="back to emails"></i>
                    </router-link>
                    <router-link class="send" to="/email" @click.native="send">                    
                        <i class="far fa-paper-plane" title="send"></i>
                    </router-link>
                    <router-link class="save" to="/email" @click.native="saveToDraft">                    
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
        this.email.sentAt = Date.now();
        this.saveToDraft(this.email);
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
            this.email.sentAt = Date.now();
            eventBus.$emit('update', this.email)
            clearInterval(this.saveDraftInterval);
        },
        saveToDraft() {
            eventBus.$emit('saveEmail', this.email);
        },
        updateDraft() {
            eventBus.$emit('update', this.email);
            console.log('here');
        }
    }

}