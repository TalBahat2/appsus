import textLength from './text-length.cmps.js';

export default {
    props: ['email'],
    components: {
        textLength
    },
    template: `
        <tr class="email-preview" @click="readMore(email)" :style="styleObject">
            <td class="sender">{{senderName}}</td>
            <td class="subject">
                <text-length :txt="email.subject" :size="10" />
            </td>
            <td class="body" :style="{'font-family': 'roboto-light, sans-serif'}">
                <text-length :txt="email.body" :size="40" />
            </td>
            <td class="date">{{formattedDate}}</td>
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
                'background-color': (this.email.isRead) ? '#f5f7f7' : '#fff',
            }
        }
    },
    methods: {
        readMore(email) {
            if(email.status !== 'draft') this.$router.push('/email/' + this.email.id)
            else this.$router.push('/email/compose/' + this.email.id)
        }
    }

}