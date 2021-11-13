import textLength from './text-length.cmps.js';
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: ['email'],
    components: {
        textLength
    },
    template: `
        <tr class="email-preview desktop-view" @click="readMore(email)" :style="styleObject">
            <td class="sender desktop">{{senderName}}</td>
            <td class="subject desktop">
                <text-length :txt="email.subject" :size="10" />
            </td>
            <td class="body desktop" :style="{'font-family': 'roboto-light, sans-serif'}">
                <text-length :txt="email.body" :size="40" />
            </td>
            <td class="date desktop">{{formattedDate}}</td>
            
            <td class="mobile">
                <div>{{senderName}}</div>
                <div>{{email.subject}}</div>
                <div :style="{'font-family': 'roboto-light, sans-serif'}">
                    <text-length :txt="email.body" :size="40" />
                </div>
            </td>
        </tr>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        formattedDate() {
            // TODO: if email was sent today, show time instead of date
            var sentAt = new Date(this.email.sentAt);
            var date = sentAt.getDate();
            var month = sentAt.toString().slice(4, 7);
            return month + ' ' + date;
        },
        senderName() {
            return this.email.from.split('@')[0];
        },
        emailLink() {
            return '/email/' + this.email.id;
        },
        styleObject() {
            return {
                'font-family': (this.email.isRead) ? 'roboto-light, sans-serif' :'roboto-medium, sans-serif',
                'background-color': (this.email.isRead) ? 'rgb(243 252 253)' : '#fff',
            }
        }
    },
    methods: {
        readMore(email) {
            this.email.isRead = true;
            eventBus.$emit('update', this.email);
            if(email.status !== 'draft') this.$router.push('/email/' + this.email.id)
            else this.$router.push('/email/compose/' + this.email.id)
        }
    }

}